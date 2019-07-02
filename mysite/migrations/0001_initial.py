# Generated by Django 2.1.7 on 2019-06-26 22:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Indice_SiMS',
            fields=[
                ('id_sims', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(null=True)),
                ('sex', models.CharField(blank=True, default='', max_length=20)),
                ('diabet_in_familie', models.BooleanField(default=False)),
                ('inaltime', models.FloatField()),
                ('varsta', models.IntegerField(null=True)),
                ('talie', models.FloatField()),
                ('glicemia', models.FloatField()),
                ('trigliceride', models.FloatField()),
                ('tensiune_sistolica', models.FloatField()),
                ('colesterol', models.FloatField()),
                ('siMS_scor', models.FloatField(null=True)),
                ('siMS_scor_risc', models.FloatField(null=True)),
                ('PsiMS_scor', models.FloatField(null=True)),
                ('siMS_scor_ref', models.FloatField(null=True)),
                ('siMS_scor_risc_ref', models.FloatField(null=True)),
                ('rezultat', models.CharField(blank=True, default='', max_length=50)),
            ],
            options={
                'verbose_name': 'Inregistrare pentru indicele siMS',
                'verbose_name_plural': 'Inregistrari pentru indicele siMS',
            },
        ),
        migrations.CreateModel(
            name='Medic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinica', models.CharField(blank=True, default='', max_length=50)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Medic',
                'verbose_name_plural': 'Medici',
            },
        ),
        migrations.CreateModel(
            name='Nefropatie',
            fields=[
                ('id_nefropatie', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(null=True)),
                ('rata_filtrare_glomerulara', models.FloatField(null=True)),
                ('albuminuria', models.FloatField(null=True)),
                ('unitate_masura', models.CharField(blank=True, default='', max_length=20)),
                ('rezultat', models.CharField(blank=True, default='', max_length=50)),
            ],
            options={
                'verbose_name': 'Inregistrare Nefropatie',
                'verbose_name_plural': 'Inregistrari Nefropatie',
            },
        ),
        migrations.CreateModel(
            name='Pacient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_nastere', models.DateField(null=True)),
                ('anticorpi', models.BooleanField(default=False)),
                ('varsta_debut', models.IntegerField(null=True)),
                ('hemoglobina_glicozilata', models.FloatField(null=True)),
                ('inaltime', models.IntegerField(null=True)),
                ('greutate', models.FloatField(null=True)),
                ('HOMA2_Beta', models.FloatField(null=True)),
                ('HOMA2_IR', models.FloatField(null=True)),
                ('cluster', models.CharField(blank=True, default='', max_length=50)),
                ('medic', models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='mysite.Medic')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Pacient',
                'verbose_name_plural': 'Pacienti',
            },
        ),
        migrations.CreateModel(
            name='Reprezentare_Glicemie',
            fields=[
                ('id_reprezentare', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(null=True)),
                ('moment_al_zilei', models.CharField(blank=True, default='', max_length=50)),
                ('valoare_glicemie', models.IntegerField()),
                ('pacient', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient')),
            ],
            options={
                'verbose_name': 'Inregistrare pentru reprezentarea glicemiei',
                'verbose_name_plural': 'Inregistrari pentru reprezentarea glicemiei',
            },
        ),
        migrations.CreateModel(
            name='Risc_Diabet',
            fields=[
                ('id_risc_diabet', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(null=True)),
                ('conditie_glicemie_pe_nemancate', models.BooleanField(default=False, null=True)),
                ('conditie_glicemie_la_doua_ore', models.BooleanField(default=False, null=True)),
                ('conditie_circumferinta_talie', models.BooleanField(default=False, null=True)),
                ('conditie_hipertensiune', models.BooleanField(default=False, null=True)),
                ('conditie_colesterol', models.BooleanField(default=False, null=True)),
                ('conditie_hiperlipidemie', models.BooleanField(default=False, null=True)),
                ('scor_cmds', models.IntegerField(null=True)),
                ('scor_cmds_modificat', models.IntegerField(null=True)),
                ('risc_cmds', models.CharField(blank=True, default='', max_length=20)),
                ('risc_cmds_modificat', models.CharField(blank=True, default='', max_length=20)),
                ('pacient', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient')),
            ],
            options={
                'verbose_name': 'Inregistrare pentru calculatorul de risc diabetic',
                'verbose_name_plural': 'Inregistrari pentru calculatorul de risc diabetic',
            },
        ),
        migrations.CreateModel(
            name='Risc_Hipoglicemie',
            fields=[
                ('id_hipoglicemie', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField(null=True)),
                ('urgente_hipoglicemie', models.CharField(blank=True, default='', max_length=20)),
                ('urgente', models.CharField(blank=True, default='', max_length=20)),
                ('insulina', models.BooleanField(default=False)),
                ('derivate_sulfoniluree', models.BooleanField(default=False)),
                ('irc_severa_terminala', models.BooleanField(default=False)),
                ('varsta_sub_77', models.BooleanField(default=False)),
                ('rezultat', models.CharField(blank=True, default='', max_length=50)),
                ('pacient', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient')),
            ],
            options={
                'verbose_name': 'Inregistrare pentru calculatorul de risc hipoglicemie',
                'verbose_name_plural': 'Inregistrari pentru calculatorul de risc hipoglicemie',
            },
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_rol', models.IntegerField(null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Rol',
                'verbose_name_plural': 'Roluri',
            },
        ),
        migrations.CreateModel(
            name='Variabilitate_Glicemie',
            fields=[
                ('id_variabilitate', models.AutoField(primary_key=True, serialize=False)),
                ('data_ora', models.DateTimeField(null=True)),
                ('valoare_glicemie', models.FloatField()),
                ('pacient', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient')),
            ],
            options={
                'verbose_name': 'Inregistrare pentru analiza glicemiei',
                'verbose_name_plural': 'Inregistrari pentru analiza glicemiei',
            },
        ),
        migrations.AddField(
            model_name='nefropatie',
            name='pacient',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient'),
        ),
        migrations.AddField(
            model_name='indice_sims',
            name='pacient',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='mysite.Pacient'),
        ),
    ]
