from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.conf import settings
from datetime import datetime

class CustomUser(AbstractUser):
    verification_code = models.CharField(max_length=5, blank=True, null=True)
    is_employee= models.BooleanField(max_length=20,default=False)

    phone = PhoneNumberField(
        unique=True,
        blank=True,
        null=True,
        help_text="أدخل رقمك بصيغة دولية: +<رمز الدولة><الرقم>"
    )
    birth_date=models.DateField(blank=True, null=True)
    total_booking = models.PositiveIntegerField(default=0)
    
    class Meta:
        swappable = 'AUTH_USER_MODEL'
    
    # تعديل related_name لتجنب التعارضات
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_perms',
        blank=True,
        verbose_name='user permissions'
    )
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class TemporaryUser(models.Model):
 
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True )
    email = models.EmailField(max_length=254,unique=True)
    password= models.CharField( max_length=128)
    first_name = models.CharField( max_length=30,blank=True)
    last_name = models.CharField(max_length=150,blank=True)
    verification_code = models.CharField(max_length=6,blank=True,null=True)
    phone = PhoneNumberField(blank=False,null=False)
    birth_date = models.DateField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "TemporaryUser"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.username} ({self.email})"
