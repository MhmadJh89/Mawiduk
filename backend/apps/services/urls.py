# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # 1. Service Endpoints (Superuser only)
    path('', views.ServiceListCreateView.as_view(), name='service-list'),
    path('all/', views.ServiceListView.as_view(), name='service-list-all'),
    path('<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    # 2. CustomService Endpoints
    path('custom-services/', views.CustomServiceForAdminListView.as_view(), name='customservice-list'),
    path('custom-services/<int:pk>/', views.CustomServiceDetailView.as_view(), name='customservice-detail'),
    path('custom-services/me/', views.MyCustomServicesListView.as_view(),name='customservice-my-list'),
    path('custom-services-months/', views.MonthListEmployeeView.as_view(),name='customservice-my-months'),

    path('delete/<int:pk>/', views.CustomServiceDeleteView.as_view(), name='customservice-delete'),
    path('custom-services/all/', views.CustomServiceListView.as_view(), name='customservice-all'),
    path('custom-services/create/', views.CustomServiceCreateView.as_view(), name='customservice-c'),
    path('custom-services/admin/all/',views.ServiceForAdminSerializer.as_view(), name='customservice-admin-all'),
    path('control-months/', views.CalendarMonthViewSet.as_view({'get': 'list', 'post': 'create'}), name='month-list'),
    path('control-months/<int:pk>/',views.CalendarMonthViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}), name='month-detail'),
    path('control-days/', views.CalendarDayViewSet.as_view({'get': 'list'}), name='day-list'),
    path('control-days/<int:pk>/', views.CalendarDayViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name='day-detail'),
    path('control-appointments/', views.AppointmentViewSet.as_view({'get': 'list'}), name='appointment-list'),
    path('control-appointments/<int:pk>/', views.AppointmentViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}), name='appointment-detail'),
    path('control-appointments/<int:pk>/book/', views.AppointmentViewSet.as_view({'post': 'book'}), name='appointment-book'),
    path('available-months/', views.MonthListView.as_view(), name='month-list'),
    path('available-days/', views.DayListView.as_view(), name='day-list'),
    path('appointments/', views.AppointmentListView.as_view(), name='appointment-list'),
]