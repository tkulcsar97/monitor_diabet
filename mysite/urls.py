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
from .models import Pacient, Variabilitate_Glicemie
import datetime

from . import views
from . import requests

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('index.htm', views.index),
    path('analiza_glicemiei.htm', views.analiza_glicemiei),
    path('autentificare.htm', views.autentificare),
    path('inregistrare.htm', views.inregistrare),
    path('reprezentarea_glicemiei.htm', views.reprezentarea_glicemiei),
    path('stadializarea_nefropatiei_diabetice.htm', views.stadializarea_nefropatiei_diabetice),
    path('calculator_hipoglicemic.htm', views.calculator_hipoglicemic),
    path('calculator_diabet.htm', views.calculator_diabet),
    path('siMS.htm', views.siMS),
    path('cauta_pacient.htm', views.cauta_pacient),
    path('statistica.htm', views.statistica),

    #url(r'analiza_glicemiei/$', requests.analiza_glicemiei),
    url(r'login/$', requests.login),
    url(r'register/$', requests.create_account),
    url(r'logout/$', requests.logout),
    url(r'set_analiza/$', requests.setare_date_analiza),
    url(r'get_analiza/$', requests.preluare_date_analiza),
    url(r'setare_date_reprezentare/$', requests.setare_date_reprezentare),
    url(r'get_reprezentare/$', requests.preluare_date_reprezentare),
    url(r'cautare_pacient/$', requests.cautare_pacient),
    url(r'deselectare_pacient/$', requests.deselect_patient),
    url(r'setare_nefropatie/$', requests.setare_date_nefropatie),
    url(r'set_risc_hipoglicemie/$', requests.setare_date_risc_hipoglicemie),
    url(r'set_risc_diabet/$', requests.setare_date_risc_diabet),
    url(r'set_indice_siMS/$', requests.setare_date_indice_siMS),
    url(r'get_nefropatie/$', requests.preluare_date_nefropatie),
    url(r'get_risc_hipoglicemie/$', requests.preluare_date_risc_hipoglicemie),
    url(r'get_risc_diabet/$', requests.preluare_date_risc_diabet),
    url(r'get_indice_siMS/$', requests.preluare_date_indice_siMS),
    url(r'get_analiza_table/$', requests.preluare_date_tabel_analiza),
    url(r'get_reprezentare_table/$', requests.preluare_date_tabel_reprezentare),
    url(r'statistics_nefropatie/$', requests.statistica_nefropatie),
    url(r'statistics_risc_hipoglicemie/$', requests.statistica_hipoglicemie),
    url(r'statistics_risc_diabet/$', requests.statistica_diabet),
    url(r'statistics_indice_siMS/$', requests.statistica_indice_siMS),

]
