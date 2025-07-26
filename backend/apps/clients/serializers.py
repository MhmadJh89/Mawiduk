from rest_framework import serializers
from apps.users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'first_name',
            'last_name',
            'phone',
            'email',
            'total_booking',
            'date_joined',
        ]

    def get_phone(self, obj):
        return str(obj.phone) if obj.phone else None
