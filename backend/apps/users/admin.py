from django.contrib import admin
from .models import *

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_active','is_employee')  # عرض الحقول في قائمة العرض
    search_fields = ('username', 'email')  # تمكين البحث عن طريق اسم المستخدم والبريد الإلكتروني

admin.site.register(CustomUser, CustomUserAdmin)

class TemporaryUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')  # عرض الحقول في قائمة العرض
admin.site.register(TemporaryUser, TemporaryUserAdmin)



