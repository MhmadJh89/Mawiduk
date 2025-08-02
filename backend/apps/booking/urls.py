from django.urls import path
from .views import (
    MyBookingsAPIView,
    UserBookingUpdateTimeStatusView,
    UserBookingEditOptionsView,
    MyScheduleAPIView,
)


urlpatterns = [
    path('my-bookings/', MyBookingsAPIView.as_view(), name='my_bookings'),
    path('user/bookings/<int:pk>/edit/', UserBookingUpdateTimeStatusView.as_view(), name='user-booking-edit'),
    path('user/bookings/<int:pk>/options/', UserBookingEditOptionsView.as_view(), name='user-booking-options'),
    path('my-schedule/', MyScheduleAPIView.as_view(), name='my_schedule'),

]
