# bookings/urls.py
from django.urls import path
from .views import (
    BookingCreateView,
    BookingUpdateView,
    BookingCancelView,
)


urlpatterns = [
    # 1. إنشاء حجز جديد
    #    POST  /bookings/
    path("bookings/", BookingCreateView.as_view(), name="booking-create" ),
    # 2. تعديل حجز موجود
    #    PUT/PATCH  /bookings/<pk>/
    path( "bookings/<int:pk>/", BookingUpdateView.as_view(),name="booking-update" ),
    # 3. إلغاء حجز
    #    DELETE  /bookings/<pk>/cancel/
    path("bookings/<int:pk>/cancel/",BookingCancelView.as_view(),name="booking-cancel" ),
]
