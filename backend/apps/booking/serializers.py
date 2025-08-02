# bookings/serializers.py
from rest_framework import serializers
from apps.appointments.models import Bookings
class BookingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    service_name = serializers.CharField(source='service.service', read_only=True)
    description = serializers.CharField(source='service.description', read_only=True)
    employee_name = serializers.CharField(source='service.employee.__str__', read_only=True)
    date = serializers.DateField(source='date_time.day.date', read_only=True)  # هذا بديل عن date_time__date
    time = serializers.TimeField(source='date_time.time', read_only=True)

    class Meta:
        model = Bookings
        fields = [
            'id',  
            'service_name',
            'date',
            'time',
            'description',
            'state',
            'employee_name',
            'note'
        ]


class ScheduleBookingSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.service', read_only=True)
    date = serializers.DateField(source='date_time.day.date', read_only=True)
    time = serializers.TimeField(source='date_time.time', read_only=True)

    class Meta:
        model = Bookings
        fields = [
            'service_name',
            'date',
            'time',
            'state',
        ]