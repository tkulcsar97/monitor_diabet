# Create your models here.

from django.db import models

class Rol(models.Model):
	id_rol = models.IntegerField(primary_key = True)
	nume_rol = models.CharField(max_length=10)
	
	class Meta: 
		verbose_name = "Rol"
		verbose_name_plural = "Roluri"
		
	def __unicode__(self):
		return self.nume_rol
	
class Utilizator(models.Model):
	nume_utilizator = models.CharField(max_length=100, primary_key = True)
	parola = models.CharField(max_length=1000)
	data_inregistrare = models.DateField()
	ultima_inregistrare = models.DateTimeField()
	id_rol = models.ForeignKey(Rol, on_delete=models.DO_NOTHING)
	data_nastere = models.DateField()
	anticorpi = models.BooleanField(default=False)
	varsta_debut = models.IntegerField()
	hemoglobina_glicozilata = models.FloatField()
	inaltime = models.IntegerField()
	greutate = models.FloatField()
	HOMA2_Beta = models.FloatField()
	HOMA2_IR = models.FloatField()
	cluster = models.CharField(max_length=50)
	
	class Meta: 
		verbose_name = "Utilizator"
		verbose_name_plural = "Utilizatori"
	
	
class Nefropatie(models.Model):
	id = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
	rata_filtrare_glomerulara = models.FloatField()
	albuminuria = models.FloatField()
	nume_utilizator = models.ForeignKey(Utilizator, on_delete = models.CASCADE)
	
	class Meta: 
		verbose_name = "Inregistrare Nefropatie"
		verbose_name_plural = "Inregistrari Nefropatie"
	
class Variabilitate_Glicemie(models.Model):
	id = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
	valoare_glicemie = models.FloatField()
	nume_utilizator = models.ForeignKey(Utilizator, on_delete = models.CASCADE)
	
	class Meta: 
		verbose_name = "Inregistrare pentru analiza glicemiei"
		verbose_name_plural = "Inregistrari pentru analiza glicemiei"
	
class Reprezentare_Glicemie(models.Model):
	id = models.AutoField(primary_key=True)
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
	nume_utilizator = models.ForeignKey(Utilizator, on_delete = models.CASCADE)
	
	class Meta: 
		verbose_name = "Inregistrare pentru reprezentarea glicemiei"
		verbose_name_plural = "Inregistrari pentru reprezentarea glicemiei"
