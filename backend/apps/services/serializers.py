from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Service,
    CustomService,
    Custom_Service_Calendar_Onemonth,
    Custom_Service_Calendar_Day,
    Custom_Service_Calendar_Appointment,
)
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ["id", "first_name","last_name", "email"]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'image']
# serializers.py
class ServiceForAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CustomService
        fields = [
            "id", "name","price","expected_duration",
            "is_available"
        ]

class CustomServiceForAdminSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)
    service  = serializers.StringRelatedField()

    class Meta:
        model  = CustomService
        fields = [
            "id", "name", "employee", "service",
            "is_available"
        ]

class CustomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomService
        fields = [
            'id', 'name', 'service', 'description', 'price',
           'expected_duration',
        ]
        read_only_fields = ['employee']

class CustomServiceListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomService
        fields = [
            'id', 'name', 'employee', 'service', 'description', 'price',
            'opening_time', 'closing_time', 'break_start_1', 'break_end_1',
            'break_start_2', 'break_end_2', 'expected_duration',
            'is_available', 'day_off_1', 'day_off_2'
        ]
        read_only_fields = ['service']

class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Onemonth
        fields = ['id', 'name', 'service', 'year', 'month', 'is_available']

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Day
        fields = ['id', 'calendar_month', 'date', 'state']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Appointment
        fields = ['id', 'day', 'time', 'state', 'description']
