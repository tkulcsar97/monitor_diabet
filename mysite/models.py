# Create your models here.

from django.db import models
from django.contrib.auth.models import User

class Rol(models.Model):
	id_rol = models.IntegerField(primary_key = True)
	nume_rol = models.CharField(max_length=10)
	
	class Meta: 
		verbose_name = "Rol"
		verbose_name_plural = "Roluri"
		
	def __unicode__(self):
		return self.nume_rol
	
class Utilizator(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	id_rol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING, null=True)
	data_nastere = models.DateField(null=True)
	anticorpi = models.BooleanField(default=False)
	varsta_debut = models.IntegerField(null=True)
	hemoglobina_glicozilata = models.FloatField(null=True)
	inaltime = models.IntegerField(null=True)
	greutate = models.FloatField(null=True)
	HOMA2_Beta = models.FloatField(null=True)
	HOMA2_IR = models.FloatField(null=True)
	cluster = models.CharField(max_length=50, default='', blank=True)
	
	class Meta: 
		verbose_name = "Utilizator"
		verbose_name_plural = "Utilizatori"

'''>>> u = User.objects.get(username='fsmith')
>>> freds_department = u.employee.department'''
	
class Nefropatie(models.Model):
	id_nefropatie = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
	rata_filtrare_glomerulara = models.FloatField()
	albuminuria = models.FloatField()
	id = models.ForeignKey(Utilizator, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare Nefropatie"
		verbose_name_plural = "Inregistrari Nefropatie"
	
class Variabilitate_Glicemie(models.Model):
	id_variabilitate = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
	valoare_glicemie = models.FloatField()
	id = models.ForeignKey(Utilizator, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare pentru analiza glicemiei"
		verbose_name_plural = "Inregistrari pentru analiza glicemiei"
	
class Reprezentare_Glicemie(models.Model):
	id_reprezentare = models.AutoField(primary_key=True)
	data = models.DateField()
	valoare_inainte_mic_dejun = models.IntegerField()
	valoare_mic_dejun = models.IntegerField()
	valoare_dupa_mic_dejun = models.IntegerField()
	valoare_mic_dejun_pranz = models.IntegerField()
	valoare_inainte_pranz = models.IntegerField()
	valoare_pranz = models.IntegerField()
	valoare_dupa_pranz = models.IntegerField()
	valoare_mic_dejun = models.IntegerField()
	valoare_pranz_cina = models.IntegerField()
	valoare_cina = models.IntegerField()
	valoare_dupa_cina = models.IntegerField()
	valoare_inainte_culcare = models.IntegerField()
	id = models.ForeignKey(Utilizator, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare pentru reprezentarea glicemiei"
		verbose_name_plural = "Inregistrari pentru reprezentarea glicemiei"
