from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
import datetime
from django.utils import timezone
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
# صلاحيات المدى الكامل للمسؤول
class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)

# صلاحيات الموظف أو القراءة فقط
class IsEmployeeOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_employee)

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(obj.employee == request.user or request.user.is_superuser)

# 1. CRUD على Service (superuser فقط)




class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]

class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]

# 2. CRUD على CustomService (الموظف صاحب الخدمة فقط)
class CustomServiceListView(generics.ListAPIView):
    
    serializer_class = CustomServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        service_id = self.request.query_params.get('service')
        return CustomService.objects.filter(service=service_id)


class CustomServiceListCreateView(generics.ListCreateAPIView):
    serializer_class = CustomServiceSerializer
    permission_classes = [IsAuthenticated, IsEmployeeOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)


class CustomServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomService.objects.all()
    serializer_class = CustomServiceSerializer
    permission_classes = [IsAuthenticated, IsEmployeeOrReadOnly]

# 3. جلب الأشهر المتاحة (is_available=True)
class MonthListView(generics.ListAPIView):
    serializer_class = MonthSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        custom_service = self.request.query_params.get('custom_service')
        return Custom_Service_Calendar_Onemonth.objects.filter(
            service_id=custom_service,
            is_available=True
        )

class CustomServiceFilter(django_filters.FilterSet):
    # فلتر الحالة الأصلي
    status = django_filters.BooleanFilter(field_name='is_available')
    
    # فلتر اليوم (0=Monday … 6=Sunday أو اسم اليوم)
    day = django_filters.CharFilter(method='filter_by_day', label='Weekday')

    class Meta:
        model  = CustomService
        fields = ['status', 'day']

    def filter_by_day(self, queryset, name, value):
        """
        يستقبل قيمة يوم كعدد (0–6) أو كاسم اليوم بالإنجليزية.
        يستبعد الخدمات التي لديها day_off_1 أو day_off_2 يساوي هذا اليوم.
        """
        # محاولة تحويل القيمة إلى عدد
        try:
            day_index = int(value)
        except (ValueError, TypeError):
            # خريطة الأسماء إلى الأرقام
            mapping = {
                'monday': 0, 'tuesday': 1, 'wednesday': 2,
                'thursday': 3, 'friday': 4, 'saturday': 5,
                'sunday': 6,
            }
            day_index = mapping.get(value.strip().lower())
            if day_index is None:
                # إذا لم يتطابق الاسم، نعيد الاستعلام الأصلي دون تعديل
                return queryset

        # استبعاد الخدمات التي لا تعمل في هذا اليوم
        return queryset.exclude(day_off_1=day_index).exclude(day_off_2=day_index)


class OneItemPagination(PageNumberPagination):
    page_size =10
    # منع تغيير حجم الصفحة عبر الباراميتر (اختياري)
    page_size_query_param = None

class CustomServiceForAdminListView(generics.ListAPIView):
    queryset = CustomService.objects.all()
    serializer_class = CustomServiceForAdminSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = OneItemPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = CustomServiceFilter


class ServiceForAdminSerializer(generics.ListAPIView):
    queryset = CustomService.objects.all()
    serializer_class = ServiceForAdminSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = OneItemPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = CustomServiceFilter

# 4. Days المفتوحة فقط (state != 'closed')
class DayListView(generics.ListAPIView):
    serializer_class = DaySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        month_id = self.request.query_params.get('month')
        return Custom_Service_Calendar_Day.objects.filter(
            calendar_month_id=month_id
        ).exclude(state='closed')

# 5. Appointments: الموظف يجلب الكل، العميل العادي يجلب state='open'
class AppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        day_id = self.request.query_params.get('day')
        qs = Custom_Service_Calendar_Appointment.objects.filter(day_id=day_id)
        if self.request.user.is_staff:
            return qs
        return qs.filter(state='open')
