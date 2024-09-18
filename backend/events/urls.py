from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_event, name='add_member'),
    path('', views.get_events, name='get_events'),
]