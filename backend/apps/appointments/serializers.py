# bookings/serializers.py

from rest_framework import serializers
from .models import Bookings

class BookingSerializer(serializers.ModelSerializer):
    """
    يَقبل حقلاً واحداً من المستخدم (date_time) و note اختياري
    ونعتمِد على perform_create/perform_update لملء الحقول الأخرى.
    """
    class Meta:
        model = Bookings
        fields = ['id', 'date_time', 'note','service']
        read_only_fields = ['id']
