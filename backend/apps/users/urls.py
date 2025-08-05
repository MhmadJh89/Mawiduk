from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from .views import *


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('admin/create/', CreateUserView.as_view(), name='create'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify/', VerifyView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('admin/<int:pk>/profile/',AdminUserProfileView.as_view(),name='admin-user-profile'),
    # path('admin-dashboard/', AdminDashboardView.as_view()),
    path('send-reset-password/', PasswordResetRequestView.as_view(), name='send-reset-password'),
    path('reset-password/', PasswordChangeRequestView.as_view(), name='password_reset_confirm'),
    path('auth/', include('social_django.urls', namespace='social')),
    path('all_users/',ShowAllUsers.as_view(),name='get_all'),
    path('delete/',DeleteUser.as_view(),name='delete_user'),

]