from rest_framework import generics, serializers, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Bookings
from .serializers import BookingSerializer
from apps.services.models import Custom_Service_Calendar_Appointment


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
