# bookings/models.py
from django.conf import settings
from django.db import models
from apps.services.models import CustomService,Custom_Service_Calendar_Appointment    # ربط بتطبيق الخدمات
  # ربط بتطبيق الموظفين

class Bookings(models.Model):

    STATE_CHOICES = [
        ('confiemed', 'Confiemed'),
        ('pending', 'Pending'),
        ('canceled', 'Canceled'),
    ]
    
    state = models.CharField(
        max_length=10,
        choices=STATE_CHOICES,
        default='pending'  # يمكنك تعديل القيمة الافتراضية حسب الحاجة
    )
    
    service = models.ForeignKey(
        CustomService,
        on_delete=models.CASCADE
    )

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='bookings',
        on_delete=models.CASCADE
    )
    date_time = models.ForeignKey(
        Custom_Service_Calendar_Appointment, 
        related_name='booking',
        on_delete=models.CASCADE
    )
    note     = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} "
    

