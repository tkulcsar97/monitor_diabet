# Generated by Django 2.1.7 on 2019-05-23 18:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mysite', '0002_auto_20190523_2121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pacient',
            name='medic',
            field=models.ForeignKey(blank=True, default='', null=True, on_delete=django.db.models.deletion.CASCADE, to='mysite.Medic', to_field='medic_id'),
        ),
    ]
