from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import (
    Service,
    CustomService,
    Custom_Service_Calendar_Onemonth,
    Custom_Service_Calendar_Day,
    Custom_Service_Calendar_Appointment,
)
from .serializers import (
    ServiceSerializer,
    CustomServiceSerializer,
    MonthSerializer,
    DaySerializer,
    AppointmentSerializer,
)

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
