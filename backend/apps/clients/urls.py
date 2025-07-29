from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from .views import *

urlpatterns = [  
   path('list/', ClientListView.as_view(), name='client-list'),
   path('clients_count/', ClientsCountAdminDashboard.as_view(), name='clients_count'),
   path('last_clients/', ClientsLastDashboard .as_view(), name='clients_count'),

   
     
]