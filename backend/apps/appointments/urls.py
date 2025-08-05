# bookings/urls.py
from django.urls import path
from .views import *


urlpatterns = [
    # 1. إنشاء حجز جديد
    #    POST  /bookings/
    path("bookings/", BookingCreateView.as_view(), name="booking-create" ),
   
    # 2. تعديل حجز موجود
    #    PUT/PATCH  /bookings/<pk>/
    path("bookings/<int:pk>/", BookingUpdateView.as_view(), name="booking-update"),

    # 3. إلغاء حجز
    #    DELETE  /bookings/<pk>/cancel/
    path("bookings/<int:pk>/cancel/", BookingCancelView.as_view(), name="booking-cancel"),

    # 4. عرض قائمة الحجوزات للادمن
    #    GET  /admin/bookings/
    path("admin/bookings/", BookingListAdminView.as_view(), name="admin-booking-list"),
    

    # 6. عرض خيارات تعديل الحجز للإدمن
    #    GET  /admin/bookings/<pk>/edit-options/
    path("admin/bookings/<int:pk>/edit-options/", BookingEditOptionsView.as_view(), name="admin-booking-edit-options"),

    # 7. تعديل الحجز (الحالة + الوقت) دفعة واحدة - للإدمن
    #    PATCH  /admin/bookings/<int:pk>/update-full/
    path("admin/bookings/<int:pk>/update-full/", BookingUpdateTimeStatusView.as_view(), name="admin-booking-update-full"),  
     
     path("bookings_count/", BookingCountAdminDashboard.as_view(), name="booking-count" ),
    path("bookings_curv/", BookingCountAdminDashboardCurf.as_view(), name="booking-curv" ),
    path("last_bookings/", BookingLastDashboard.as_view(), name="booking-curv" ), 
    path("delete/", DeleteBooking.as_view(), name="booking-del" ), 

]
