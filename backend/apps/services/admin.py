from django.contrib import admin
from .models import *

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
admin.site.register(Service, ServiceAdmin)

class CustomServiceAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'employee','service','description','price','opening_time',
                    'closing_time','break_start_1','break_end_1','break_start_2',
                    'break_end_2','expected_duration','is_available')
admin.site.register(CustomService, CustomServiceAdmin)
admin.site.register(Custom_Service_Calendar_Onemonth)
admin.site.register(Custom_Service_Calendar_Day)
admin.site.register(Custom_Service_Calendar_Appointment)

# Register your models here.