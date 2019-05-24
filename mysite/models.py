 # Create your models here.

from django.db import models
from django.contrib.auth.models import User
import datetime

class Rol(models.Model):
	#id_r = models.AutoField(primary_key=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	id_rol = models.IntegerField(null=True)
	
	class Meta: 
		verbose_name = "Rol"
		verbose_name_plural = "Roluri"
		
	def __unicode__(self):
		return self.nume_rol
	
class Medic(models.Model):
	#id_m = models.AutoField(primary_key=True)
	medic = models.OneToOneField(User, on_delete=models.CASCADE)
	clinica = models.CharField(max_length=50, default='', blank=True)

	class Meta: 
		verbose_name = "Medic"
		verbose_name_plural = "Medici"

class Pacient(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	#id_rol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING, null=True)
	data_nastere = models.DateField(null=True)
	anticorpi = models.BooleanField(default=False)
	varsta_debut = models.IntegerField(null=True)
	hemoglobina_glicozilata = models.FloatField(null=True)
	inaltime = models.IntegerField(null=True)
	greutate = models.FloatField(null=True)
	HOMA2_Beta = models.FloatField(null=True)
	HOMA2_IR = models.FloatField(null=True)
	cluster = models.CharField(max_length=50, default='', blank=True)
	medic = models.ForeignKey(Medic, to_field='medic_id', blank=True, null=True, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Pacient"
		verbose_name_plural = "Pacienti"
	
class Nefropatie(models.Model):
	id_nefropatie = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
	rata_filtrare_glomerulara = models.FloatField()
	albuminuria = models.FloatField()
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare Nefropatie"
		verbose_name_plural = "Inregistrari Nefropatie"
	
class Variabilitate_Glicemie(models.Model):
	id_variabilitate = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField(default=datetime.datetime.today)
	valoare_glicemie = models.FloatField()
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare pentru analiza glicemiei"
		verbose_name_plural = "Inregistrari pentru analiza glicemiei"
	
class Reprezentare_Glicemie(models.Model):
	id_reprezentare = models.AutoField(primary_key=True)
	data = models.DateField()
	moment_al_zilei = models.CharField(max_length=50, default='', blank=True)
	valoare_glicemie = models.IntegerField()
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare pentru reprezentarea glicemiei"
		verbose_name_plural = "Inregistrari pentru reprezentarea glicemiei"
