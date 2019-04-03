"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.contrib.auth.models import User
from .models import Utilizator

from . import views
from . import requests

print("------------------ajungem aici-------------------------")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('index.htm', views.index),
    path('analiza_glicemiei.htm', views.analiza_glicemiei),
    path('autentificare.htm', views.autentificare),
    path('inregistrare.htm', views.inregistrare),
    path('reprezentarea_glicemiei.htm', views.reprezentarea_glicemiei),
    path('stadializarea_nefropatiei_diabetice.htm', views.stadializarea_nefropatiei_diabetice),
    url(r'analiza_glicemiei/$', requests.analiza_glicemiei),
    url(r'login/$', requests.login),
    url(r'register/$', requests.create_account)
]
