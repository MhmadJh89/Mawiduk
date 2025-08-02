from rest_framework import generics, serializers, permissions
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import Bookings
from .serializers import *
from apps.services.serializers import AppointmentSerializer, DaySerializer
from apps.services.models import Custom_Service_Calendar_Appointment,Custom_Service_Calendar_Day
from django.core.mail import get_connection, send_mail
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from datetime import timedelta
from datetime import date

def send_email_after_booking(user, request):

    # إنشاء اتصال باستخدام Console backend
    connection = get_connection(
        # backend='django.core.mail.backends.smtp.EmailBackend'
        backend='django.core.mail.backends.console.EmailBackend'
    )

    subject = 'تم تأكيد عملية الحجز'
    message = f'موعدك Moiduk تم تأكيد الحجز بنجاح'
    recipient_list = [user.email]
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False,connection=connection)

class IsBookingOwnerOrSuper(permissions.BasePermission):
    """
    يسمح للعميل صاحب الحجز أو superuser:
      - بالتعديل
      - بالإلغاء
    """
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and (
                request.user.is_superuser or
                obj.client == request.user
            )
        )

class BookingCreateView(generics.CreateAPIView):
    """
    إنشاء حجز جديد:
    - يتحقق أن الفتحة مفتوحة
    - يضبط حالتها إلى 'booked'
    - يربط الحجز بالخدمة والمستخدم الحالي
    """
    queryset = Bookings.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        appointment = serializer.validated_data['date_time']
        if appointment.state != 'open':
            raise serializers.ValidationError("Time slot is not available.")
        # حجز الفتحة
        appointment.state = 'booked'
        appointment.save()
        # اشتقاق الخدمة من الموعد
        svc = appointment.day.calendar_month.service
        serializer.save(client=self.request.user, service=svc)

class BookingCountAdminDashboard(APIView):
    def get(self, request):
        today       = timezone.now().date()
        week_ago    = today - timezone.timedelta(days=7)
        month_ago   = today - timezone.timedelta(days=30)

        count_today  = Bookings.objects.filter(created_at__date=today).count()
        count_week   = Bookings.objects.filter(created_at__date__gte=week_ago).count()
        count_month  = Bookings.objects.filter(created_at__date__gte=month_ago).count()
       
        return Response({
            "today": count_today,
            "last_week": count_week,
            "last_month": count_month,
        })

class BookingCountAdminDashboardCurf(APIView):
    serializer_class = BookingSerializerDashboard
    def get(self, request):
        today     = timezone.now().date()
        month_ago = today - timedelta(days=30)

        # قائمة لتخزين النتائج اليومية
        daily_counts = []

        for i in range(30):
            day = month_ago + timedelta(days=i+1)
            count = Bookings.objects.filter(created_at__date=day).count()
            daily_counts.append({
                "date": day.isoformat(),
                "booking_count": count
            })

        return Response(daily_counts)
    
class BookingLastDashboard(generics.ListAPIView):
    queryset = Bookings.objects.order_by('-created_at')[:8]
    serializer_class = BookingSerializerLast

class BookingUpdateView(generics.UpdateAPIView):
    """
    تعديل حجز موجود:
    - تحرير الفتحة القديمة عند تغيير الموعد
    - حجز الفتحة الجديدة
    - تحديث الخدمة تلقائياً
    """
    queryset = Bookings.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsBookingOwnerOrSuper]

    def perform_update(self, serializer):
        booking = self.get_object()
        new_apt = serializer.validated_data.get('date_time')
        old_apt = booking.date_time

        if new_apt and new_apt != old_apt:
            if new_apt.state != 'open':
                raise serializers.ValidationError("New time slot is not available.")
            # تحرير القديم
            old_apt.state = 'open'
            old_apt.save()
            # حجز الجديد
            new_apt.state = 'booked'
            new_apt.save()
            # تحديث الخدمة
            svc = new_apt.day.calendar_month.service
            serializer.save(service=svc)
        else:
            serializer.save()


class BookingCancelView(generics.DestroyAPIView):
    """
    إلغاء حجز:
    - إعادة حالة الفتحة إلى 'open'
    - حذف سجل الحجز
    """
    queryset = Bookings.objects.all()
    permission_classes = [IsAuthenticated, IsBookingOwnerOrSuper]

    def perform_destroy(self, instance):
        apt = instance.date_time
        apt.state = 'open'
        apt.save()
        instance.delete()


class BookingUpdateTimeStatusView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            booking = Bookings.objects.select_related('date_time').get(pk=pk)
        except Bookings.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=404)

        new_status = request.data.get('state')
        new_appointment_id = request.data.get('appointment_id')  # الموعد الجديد إذا أراد تغييره

        # تحديث الحالة إذا وُجدت
        if new_status:
            booking.state = new_status

        # تغيير الموعد إذا وُجد
        if new_appointment_id:
            try:
                new_appointment = Custom_Service_Calendar_Appointment.objects.get(id=new_appointment_id)
            except Custom_Service_Calendar_Appointment.DoesNotExist:
                return Response({'error': 'Invalid appointment ID'}, status=400)

            if new_appointment.state != 'open':
                return Response({'error': 'The new appointment is not available'}, status=400)

            # فتح الموعد القديم
            old_appointment = booking.date_time
            old_appointment.state = 'open'
            old_appointment.save()

            # حجز الجديد
            new_appointment.state = 'booked'
            new_appointment.save()

            # تحديث الموعد والخدمة
            booking.date_time = new_appointment
            booking.service = new_appointment.day.calendar_month.service

        booking.save()
        return Response({
            'message': 'Booking updated successfully',
            'booking': BookingListAdminSerializer(booking).data
        })

class BookingEditOptionsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        try:
            booking = Bookings.objects.select_related(
                'date_time__day__calendar_month__service'
            ).get(pk=pk)
        except Bookings.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=404)

        current_appointment = booking.date_time
        day = current_appointment.day
        service = day.calendar_month.service

        # المواعيد المفتوحة في نفس اليوم
        available_slots_same_day = Custom_Service_Calendar_Appointment.objects.filter(
            day=day,
            state='open'
        )

        # الأيام القادمة المفتوحة لنفس الخدمة
        future_days = Custom_Service_Calendar_Day.objects.filter(
            calendar_month__service=service,
            date__gt=day.date,
        ).exclude(state='closed').order_by('date')[:5]  # نعرض أول 5 أيام مفتوحة فقط

        future_days_data = []
        for d in future_days:
            slots = Custom_Service_Calendar_Appointment.objects.filter(day=d, state='open')
            future_days_data.append({
                'day': DaySerializer(d).data,
                'available_slots': AppointmentSerializer(slots, many=True).data
            })

        return Response({
            'booking': BookingListAdminSerializer(booking).data,
            'available_slots_same_day': AppointmentSerializer(available_slots_same_day, many=True).data,
            'future_days': future_days_data
        })


class BookingListAdminView(ListAPIView):
    queryset = Bookings.objects.all().select_related(
        'client',
        'service',
        #'state',
        'date_time__day__calendar_month__service__employee'
    ).order_by('-date_time__day__date', '-date_time__time')  # ترتيب تلقائي من الأحدث للأقدم

    serializer_class = BookingListAdminSerializer
    permission_classes = [IsAdminUser]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'state': ['exact'],  # فلترة حسب الحالة
        'date_time__day__date': ['exact', 'gte', 'lte'],  # فلترة حسب التاريخ (يوم محدد أو بين تاريخين)
    }

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        today = date.today().strftime('%A, %B %#d, %Y')  # صيغة التاريخ لو على ويندوز
        return Response({
            'today': today,
            'results': response.data
        })
