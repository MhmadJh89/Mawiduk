from rest_framework.response import Response
from rest_framework.generics import ListAPIView 
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from datetime import date

from apps.appointments.models import Bookings
from apps.services.models import Custom_Service_Calendar_Appointment, Custom_Service_Calendar_Day
from .serializers import BookingSerializer , ScheduleBookingSerializer
from apps.appointments.serializers import BookingListAdminSerializer 
from apps.services.serializers import DaySerializer, AppointmentSerializer

class MyBookingsAPIView(ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'state': ['exact'],
        'date_time__day__date': ['exact', 'gte', 'lte'],
    }

    def get_queryset(self):
        return Bookings.objects.filter(client=self.request.user).select_related('service', 'date_time')

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        today = date.today().strftime('%A, %B %#d, %Y')  # صيغة التاريخ لو على ويندوز
        return Response({
            'today': today,
            'results': response.data
        })


class UserBookingUpdateTimeStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        booking = get_object_or_404(Bookings, pk=pk, client=request.user)

        new_status = request.data.get('state')
        new_appointment_id = request.data.get('appointment_id')

        if new_status == 'canceled':
            if booking.state == 'canceled':
                return Response({'detail': 'الحجز ملغي مسبقًا.'}, status=status.HTTP_400_BAD_REQUEST)
            booking.state = 'canceled'
            booking.save()
            return Response({'detail': 'تم إلغاء الحجز بنجاح.'}, status=status.HTTP_200_OK)

        allowed_status_changes = ['pending']
        if new_status and new_status not in allowed_status_changes:
            return Response({'error': 'غير مسموح بتغيير هذه الحالة'}, status=status.HTTP_403_FORBIDDEN)

        if new_status:
            booking.state = new_status

        if new_appointment_id:
            try:
                new_appointment = Custom_Service_Calendar_Appointment.objects.get(id=new_appointment_id)
            except Custom_Service_Calendar_Appointment.DoesNotExist:
                return Response({'error': 'معرف الموعد غير صالح'}, status=status.HTTP_400_BAD_REQUEST)

            if new_appointment.state != 'open':
                return Response({'error': 'الموعد الجديد غير متاح'}, status=status.HTTP_400_BAD_REQUEST)

            old_appointment = booking.date_time
            old_appointment.state = 'open'
            old_appointment.save()

            new_appointment.state = 'booked'
            new_appointment.save()

            booking.date_time = new_appointment
            booking.service = new_appointment.day.calendar_month.service

        booking.save()
        return Response({
            'message': 'تم تحديث الحجز بنجاح',
            'booking': BookingListAdminSerializer(booking).data
        })

class UserBookingEditOptionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        booking = get_object_or_404(Bookings.objects.select_related(
            'date_time__day__calendar_month__service'
        ), pk=pk, client=request.user)

        current_appointment = booking.date_time
        day = current_appointment.day
        service = day.calendar_month.service

        available_slots_same_day = Custom_Service_Calendar_Appointment.objects.filter(
            day=day,
            state='open'
        )

        future_days = Custom_Service_Calendar_Day.objects.filter(
            calendar_month__service=service,
            date__gt=day.date,
        ).exclude(state='closed').order_by('date')[:5]

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


class MyScheduleAPIView(ListAPIView):
    serializer_class = ScheduleBookingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'state': ['exact'],
        'date_time__day__date': ['exact', 'gte', 'lte'],
    }

    def get_queryset(self):
        return Bookings.objects.filter(
            client=self.request.user
        ).select_related('service', 'date_time').order_by('date_time__day__date', 'date_time__time')
