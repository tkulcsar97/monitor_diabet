# Register your models here.

from django.contrib import admin
from .models import Rol, Pacient, Nefropatie, Variabilitate_Glicemie, Reprezentare_Glicemie

admin.site.register(Rol)
admin.site.register(Pacient)
admin.site.register(Nefropatie)
admin.site.register(Variabilitate_Glicemie)
admin.site.register(Reprezentare_Glicemie)


