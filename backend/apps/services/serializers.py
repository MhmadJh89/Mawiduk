
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

class CustomServiceSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = CustomService
        fields = [
            'id', 'name', 'service', 'description', 'price','image',
           'expected_duration',"opening_time","closing_time","break_start_1","break_end_1",
  "break_start_2","break_end_2","expected_duration","is_available",
  "day_off_1","day_off_2"
        ]
        read_only_fields = ['employee']

class CustomServiceSerializer(serializers.ModelSerializer):
    employee = UserSerializer(read_only=True)  # إظهار بيانات الموظف
    service = ServiceSerializer(read_only=True)  # إظهار بيانات الخدمة الأصلية
    
    class Meta:
        model = CustomService
        fields = [
            'id', 'name', 'employee', 'service', 'description', 'price', 'image',
            'opening_time', 'closing_time', 'break_start_1', 'break_end_1',
            'break_start_2', 'break_end_2', 'expected_duration', 'is_available',
            'day_off_1', 'day_off_2'
        ]
class CustomServiceSerializerEmployee(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_image = serializers.ImageField(source='service.image', read_only=True)

    class Meta:
        model = CustomService
        fields = [
            'id',
            'name',
            'description',
            'price',
            'expected_duration',
            'opening_time',
            'closing_time',
            'service_name',
            'service_image',
            'is_available',
            'day_off_1',
            'day_off_2',
        ]
        read_only_fields = ['id', 'service_name', 'service_image']


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


class CalendarMonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Onemonth
        fields = ['id','name', 'service', 'year', 'month', 'is_available']
        read_only_fields = ['id']

# 2. Serializer لليوم الواحد (نعدل فقط الحقل state)
class CalendarDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Day
        fields = ['id', 'date', 'state']
        read_only_fields = ['id', 'date']

# 3. Serializer للحجز (state + وقت ومعلومات إضافية)
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_Service_Calendar_Appointment
        fields = ['id', 'day', 'time', 'state', 'description']
        read_only_fields = ['id', 'day', 'time']