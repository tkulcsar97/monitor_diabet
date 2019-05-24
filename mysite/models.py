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
	data = models.DateField()
	rata_filtrare_glomerulara = models.FloatField(null=True)
	albuminuria = models.FloatField(null=True)
	unitate_masura = models.CharField(max_length=20, default='', blank=True)
	rezultat = models.CharField(max_length=50, default='', blank=True)
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")
	
	class Meta: 
		verbose_name = "Inregistrare Nefropatie"
		verbose_name_plural = "Inregistrari Nefropatie"
	
class Variabilitate_Glicemie(models.Model):
	id_variabilitate = models.AutoField(primary_key=True)
	data_ora = models.DateTimeField()
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

class Risc_Hipoglicemie(models.Model):
	id_hipoglicemie = models.AutoField(primary_key=True)
	data = models.DateField()
	urgente_hipoglicemie = models.CharField(max_length=20, default="", blank=True)
	urgente = models.CharField(max_length=20, default="", blank=True)
	insulina = models.BooleanField(default=False)
	derivate_sulfoniluree = models.BooleanField(default=False)
	irc_severa_terminala = models.BooleanField(default = False)
	varsta_sub_77 = models.BooleanField(default=False)
	rezultat = models.CharField(max_length=50, default="", blank=True)
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")

	class Meta: 
		verbose_name = "Inregistrare pentru calculatorul de risc hipoglicemie"
		verbose_name_plural = "Inregistrari pentru calculatorul de risc hipoglicemie"

class Risc_Diabet(models.Model):
	id_risc_diabet = models.AutoField(primary_key=True)
	data = models.DateField()
	conditie_glicemie_pe_nemancate = models.BooleanField(default=False, null=True)
	conditie_glicemie_la_doua_ore = models.BooleanField(default=False, null=True)
	conditie_circumferinta_talie = models.BooleanField(default=False, null=True)
	conditie_hipertensiune = models.BooleanField(default=False, null=True)
	conditie_colesterol = models.BooleanField(default=False, null=True)
	conditie_hiperlipidemie = models.BooleanField(default=False, null=True)
	scor_cmds = models.IntegerField(null=True)
	scor_cmds_modificat = models.IntegerField(null=True)
	user = models.ForeignKey(User, on_delete = models.CASCADE, default="")

	class Meta: 
		verbose_name = "Inregistrare pentru calculatorul de risc diabetic"
		verbose_name_plural = "Inregistrari pentru calculatorul de risc diabetic"

class Indice_SiMS(models.Model):
	id_sims = models.AutoField(primary_key=True)
	data = models.DateField()
	sex = models.CharField(max_length=20, default="", blank=True)
	diabet_in_familie = models.BooleanField(default=False)
	inaltime = models.FloatField()
	varsta = models.IntegerField(null=True)
	talie = models.FloatField()
	glicemia = models.FloatField()
	trigliceride = models.FloatField()
	tensiune_sistolica = models.FloatField()
	colesterol = models.FloatField()
	siMS_scor = models.FloatField(null=True)
	siMS_scor_risc = models.FloatField(null=True)
	PsiMS_scor = models.FloatField(null=True)
	siMS_scor_ref = models.FloatField(null=True)
	siMS_scor_risc_ref = models.FloatField(null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, default="")

	class Meta: 
		verbose_name = "Inregistrare pentru indicele siMS"
		verbose_name_plural = "Inregistrari pentru indicele siMS"