# bookings/serializers.py
from rest_framework import serializers
from .models import Bookings

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bookings
        fields = ['id', 'date_time', 'note','service','client']
        read_only_fields = ['id']

class BookingSerializerLast(serializers.ModelSerializer):
    client_full_name = serializers.SerializerMethodField()
    service = serializers.CharField(source='service.name')

    class Meta:
        model = Bookings
        fields = ['id', 'date_time','service','client_full_name','state']
        read_only_fields = ['id']

    def get_client_full_name(self, obj):
        first_name = getattr(obj.client, 'first_name', '')
        last_name = getattr(obj.client, 'last_name', '')
        return f"{first_name} {last_name}".strip()

class BookingListAdminSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.__str__', read_only=True)  # يعرض الاسم الكامل
    service_name = serializers.CharField(source='service.service', read_only=True)
    date = serializers.DateField(source='date_time.day.date', read_only=True)
    time = serializers.TimeField(source='date_time.time', read_only=True)
    employee_name = serializers.CharField(source='service.employee.__str__', read_only=True)

    class Meta:
        model = Bookings
        fields = [
            'id',
            'client_name',
            'service_name',
            'date',
            'time',
            'employee_name',
            'state',
        ]
        


class BookingSerializerDashboard(serializers.ModelSerializer):

    class Meta:
        model = Bookings
        fields = ['id','created_at']
        read_only_fields = ['id']