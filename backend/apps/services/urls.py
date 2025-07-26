# urls.py
from django.urls import path
from . import views

urlpatterns = [
    # 1. Service Endpoints (Superuser only)
    path('', views.ServiceListCreateView.as_view(), name='service-list'),
    path('all/', views.ServiceListView.as_view(), name='service-list-all'),
    path('/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    
    # 2. CustomService Endpoints
    path('custom-services/', views.CustomServiceListCreateView.as_view(), name='customservice-list'),
    path('custom-services/<int:pk>/', views.CustomServiceDetailView.as_view(), name='customservice-detail'),
    path('custom-services/all/', views.CustomServiceListView.as_view(), name='customservice-all'),

    # 3. Available Months
    path('available-months/', views.MonthListView.as_view(), name='month-list'),
    
    # 4. Available Days
    path('available-days/', views.DayListView.as_view(), name='day-list'),
    
    # 5. Appointments
    path('appointments/', views.AppointmentListView.as_view(), name='appointment-list'),
]