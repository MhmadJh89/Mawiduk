from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .models import *
from .serializers import *
import datetime
from django.utils import timezone
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response
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

class CustomServiceDeleteView(generics.DestroyAPIView):
    queryset = CustomService.objects.all()
    serializer_class = CustomServiceSerializer
    permission_classes = [IsAdminUser]


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated, IsSuperUser]


class CustomServiceCreateView(generics.ListCreateAPIView):
    queryset = CustomService.objects.all()
    serializer_class = CustomServiceSerializerCreate
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

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

# views.py
class CustomServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomService.objects.all()
    serializer_class = CustomServiceSerializer  # استخدم السيريالايزر المعدل
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        # تأكيد أن الموظف هو صاحب الخدمة فقط يمكنه التعديل
        if self.request.user == serializer.instance.employee or self.request.user.is_superuser:
            serializer.save()
        else:
            return "error"



# 3. جلب الأشهر المتاحة (is_available=True)
class MonthListEmployeeView(generics.ListAPIView):
    serializer_class = MonthSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        custom_service = self.request.query_params.get('custom_service')
        return Custom_Service_Calendar_Onemonth.objects.filter(
            service_id=custom_service,
        )
    
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
        if self.request.user.is_employee:
            return qs
        return qs.filter(state='open')






class IsStaffOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_employee)


class CanBookAppointment(BasePermission):

    def has_permission(self, request, view):
        # تأكد فقط من المصادقة العامة للـ book
        if view.action == 'book':
            return bool(request.user and request.user.is_authenticated)
        return True

    def has_object_permission(self, request, view, obj):
        if view.action == 'book':
            return obj.state == 'open'
        return bool(request.user and request.user.is_employee)


# الـ ViewSets
class CalendarMonthViewSet(viewsets.ModelViewSet):

    queryset = Custom_Service_Calendar_Onemonth.objects.all()
    serializer_class = CalendarMonthSerializer
    permission_classes = [IsStaffOrReadOnly]


class CalendarDayViewSet(viewsets.GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin):
  
    queryset = Custom_Service_Calendar_Day.objects.select_related('calendar_month')
    serializer_class = CalendarDaySerializer
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        month_id = self.request.query_params.get('calendar_month')
        if month_id is not None:
            qs = qs.filter(calendar_month_id=month_id)
        return qs


class MyCustomServicesListView(generics.ListAPIView):
    serializer_class = CustomServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        return CustomService.objects.filter(employee=self.request.user)

class AppointmentViewSet(viewsets.GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin):

    queryset = Custom_Service_Calendar_Appointment.objects.select_related('day')
    serializer_class = AppointmentSerializer
    permission_classes = [CanBookAppointment]

    def get_queryset(self):
        qs = super().get_queryset()
        day_id = self.request.query_params.get('day')
        if day_id is not None:
            qs = qs.filter(day=day_id)
        return qs

    @action(detail=True, methods=['post'])
    def book(self, request, pk=None):
     
        appt = self.get_object()
        self.check_object_permissions(request, appt)

        if appt.state != 'open':
            return Response(
                {"detail": "هذا الموعد غير متاح للحجز."},
                status=status.HTTP_400_BAD_REQUEST
            )

        appt.state = 'booked'
        appt.save(update_fields=['state'])
        return Response(self.get_serializer(appt).data, status=status.HTTP_200_OK)