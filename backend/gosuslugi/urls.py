from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.gosuslugi_login, name='login'),
    path('callback/', views.gosuslugi_callback, name='callback'),
]