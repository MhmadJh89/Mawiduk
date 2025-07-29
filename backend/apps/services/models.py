
import calendar
from datetime import date, time
from django.conf import settings
from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime


class Service(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='services/', blank=True, null=True)

    def __str__(self):
        return self.name

class CustomService(models.Model):
    name = models.CharField(max_length=100)
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='employees',
        on_delete=models.CASCADE
    )
    service = models.ForeignKey(
        Service,
        related_name='services',
        on_delete=models.CASCADE
    )
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    opening_time   = models.TimeField()
    closing_time   = models.TimeField()
    break_start_1  = models.TimeField(blank=True, null=True)
    break_end_1    = models.TimeField(blank=True, null=True)
    break_start_2  = models.TimeField(blank=True, null=True)
    break_end_2    = models.TimeField(blank=True, null=True)
    expected_duration = models.DurationField(default=timedelta(minutes=30))
    is_available      = models.BooleanField(default=True)
    day_off_1 = models.IntegerField(blank=True, null=True, choices=[(i, d) for i,d in enumerate(
    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    )])
    day_off_2 = models.IntegerField(blank=True, null=True, choices=[(i, d) for i,d in enumerate(
    ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    )])


    def __str__(self):
        return f"{self.name} – {self.service.name}"
    

class Custom_Service_Calendar_Onemonth(models.Model):
    name = models.CharField(max_length=100)
    service = models.ForeignKey(CustomService, on_delete=models.CASCADE)
    year = models.PositiveIntegerField(default=timezone.now().year)
    month = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 13)])
    is_available = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.name} – {self.year}-{self.month:02d}"



class Custom_Service_Calendar_Day(models.Model):
    STATE_CHOICES = [
        ('closed', 'Closed'),
        ('open', 'Open'),
    ]
    state = models.CharField(
        max_length=10,
        choices=STATE_CHOICES,
        default='open'  # يمكنك تعديل القيمة الافتراضية حسب الحاجة
    )
    calendar_month = models.ForeignKey(
        Custom_Service_Calendar_Onemonth,
        on_delete=models.CASCADE,
        related_name='days'
    )
    date = models.DateField()

    class Meta:
        unique_together = ('calendar_month', 'date')

    def __str__(self):
        return f"{self. date.strftime('%A')} - {self.date.isoformat()}"
    
class Custom_Service_Calendar_Appointment(models.Model):
    STATE_CHOICES = [
        ('closed', 'Closed'),
        ('open', 'Open'),
        ('booked', 'Booked'),
        ('break', 'Break'),
    ]

    day = models.ForeignKey(
        Custom_Service_Calendar_Day,
        on_delete=models.CASCADE,
        related_name='appointments'
    )
    
    state = models.CharField(
        max_length=10,
        choices=STATE_CHOICES,
        default='open'  # يمكنك تعديل القيمة الافتراضية حسب الحاجة
    )
    time = models.TimeField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.day.date} - {self.time} ({self.state})"
    
@receiver(post_save, sender=Custom_Service_Calendar_Onemonth)
def create_days_for_month(sender, instance, created, **kwargs):
    # إذا الأيام موجودة مسبقاً لا ننشئها مرة ثانية
    if instance.days.exists():
        return

    service = instance.service
    year, month = instance.year, instance.month
    num_days = calendar.monthrange(year, month)[1]

    # جهّز مجموعة أيام العطلة (تُزال None إذا لم تُحدد)
    day_offs = {service.day_off_1, service.day_off_2}
    day_offs.discard(None)

    days = []
    for day_num in range(1, num_days + 1):
        dt = date(year, month, day_num)
        state = 'closed' if dt.weekday() in day_offs else 'open'
        days.append(
            Custom_Service_Calendar_Day(
                calendar_month=instance,
                date=dt,
                state=state
            )
        )

    # أنشئ كل الأيام دفعة واحدة
    Custom_Service_Calendar_Day.objects.bulk_create(days)

    # بعد إنشاء الأيام، أنشئ الفترات لكل يوم
    created_days = Custom_Service_Calendar_Day.objects.filter(calendar_month=instance)
    for day in created_days:
        service = day.calendar_month.service
        opening = service.opening_time
        closing = service.closing_time
        duration = service.expected_duration

    # جهّز فترات الاستراحة إن وجدت
        breaks = []
        if service.break_start_1 and service.break_end_1:
            breaks.append((service.break_start_1, service.break_end_1))
        if service.break_start_2 and service.break_end_2:
            breaks.append((service.break_start_2, service.break_end_2))

        appointments = []
        current_dt = datetime.combine(day.date, opening)
        closing_dt = datetime.combine(day.date, closing)

        while current_dt + duration <= closing_dt:
            slot_time = current_dt.time()

        # تحديد حالة الفتحة
            if day.state == 'closed':
                state = 'closed'
            else:
                in_break = any(
                    start <= slot_time < end
                for start, end in breaks
                )
                state = 'break' if in_break else 'open'

            appointments.append(
            Custom_Service_Calendar_Appointment(
                day=day,
                time=slot_time,
                state=state
            )
            )
            current_dt += duration

    # أنشئ جميع الفترات دفعة واحدة
        Custom_Service_Calendar_Appointment.objects.bulk_create(appointments)

    



