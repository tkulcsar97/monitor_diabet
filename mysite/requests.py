from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Pacient, Variabilitate_Glicemie, Reprezentare_Glicemie, Rol
from . import views
import datetime

def analiza_glicemiei(request):
    text = request.GET.get('text')
    data = {
        'text': 'am primit:' + text
    }
    print(data)
    return JsonResponse(data)

def login(request):
    print ('AICI, IN LOGIN')
    username = request.GET.get('username')
    password = request.GET.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        views.logged = True
        views.username = username
        views.password = password
        user_for_role = User.objects.get(username=username)
        role = Rol.objects.get(user=user_for_role)
        views.role = role.id_rol
        print("ROLLLLLLLLLLLLL", views.role)
        data = {'successful': True}
    else:
        data = {'successful': False}

    return JsonResponse(data)

def create_account(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    birth_date = request.GET.get('birth_date')
    #antibodies = request.GET.get('antibodies')
    onset_age = request.GET.get('onset_age')

    antibodies = True

    print (username)
    print (password)

    try:
        user = User.objects.create_user(username=username
                ,password=password)
    except IntegrityError as e:
        print(e)
        data = {'successful': False}
    else:
        utilizator = Pacient(user=user)
        utilizator.data_nastere = birth_date
        utilizator.anticorpi = antibodies
        utilizator.varsta_debut = onset_age
        utilizator.save()
        rol = Rol(user=user)
        rol.id_rol = 1 # 1 -> pacient
        rol.save()
        data = {'successful': True}   
    return JsonResponse(data)

def logout(request):
    print("se delogheaza")
    views.logged = False
    views.username = ''
    views.role = None
    return JsonResponse({'data': None})

def setare_date_analiza(request):
    date = request.GET.get('moment_valoare') # de modificat datetime
    value = request.GET.get('valoare')

    print (date)
    print (value)
    try:
        user = User.objects.get(username=views.username)
    except IntegrityError:
        data = {'successful': False}
    else:
        analiza_glicemie = Variabilitate_Glicemie(user=user)
        #temp_date = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')

        analiza_glicemie.valoare_glicemie = value
        analiza_glicemie.data_ora = date
        analiza_glicemie.save()
        data = {'successful': True}
    return JsonResponse(data)

def preluare_date_analiza(request):
    temp_start = datetime.datetime.strptime(request.GET.get('start_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    temp_end = datetime.datetime.strptime(request.GET.get('end_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    
    # temp_start = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')#aici vine si cu time?
    # temp_end = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
    
    user = User.objects.get(username=views.username)
    data = {}
    count = 0
    inregistrari_glicemie = Variabilitate_Glicemie.objects.all()
    for inregistrare_glicemie in inregistrari_glicemie:
        if(inregistrare_glicemie.user == user):
            if(inregistrare_glicemie.data_ora.replace(tzinfo=None) > temp_start and inregistrare_glicemie.data_ora.replace(tzinfo=None) < temp_end):
                count=count+1
                data['inreg'+str(count)] = {'date': inregistrare_glicemie.data_ora, 'value':
                inregistrare_glicemie.valoare_glicemie}
    print(data)
    return JsonResponse(data)

def setare_date_reprezentare(request):
    date = datetime.datetime.strptime(request.GET.get('date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    value = request.GET.get('valoare')
    moment = request.GET.get('moment')#de modificat in functie de ce e in form
    try:
        user = User.objects.get(username=views.username)
    except IntegrityError:
        data = {'successful': False}
    else:
        reprezentare_glicemie = Reprezentare_Glicemie(user=user)
        #temp_date = datetime.strptime(date, '%Y-%m-%d').date()
        reprezentare_glicemie.valoare_glicemie = value
        reprezentare_glicemie.data = date
        reprezentare_glicemie.moment_al_zilei = moment
        reprezentare_glicemie.save()
        data = {'successful': True}
    return JsonResponse(data)

def preluare_date_reprezentare(request):
    date = datetime.datetime.strptime(request.GET.get('zi_valoare'), "%Y-%m-%dT%H:%M:%S.%fZ")
    user = User.objects.get(username=views.username)
    #temp_date = datetime.strptime(date, '%Y-%m-%d').date()
    data = {}
    count = 0
    inregistrari_grafic = Reprezentare_Glicemie.objects.all()
    for inregistrare_grafic in inregistrari_grafic:
        if(inregistrare_grafic.user == user):
            print(inregistrare_grafic.data, date.date())
            if(inregistrare_grafic.data == date.date()):
                count=count+1
                data[inregistrare_grafic.moment_al_zilei] = inregistrare_grafic.valoare_glicemie
    return JsonResponse(data)

def cautare_pacient(request):
    searched_patient = request.GET.get('pacient')
    if(User.objects.filter(username=searched_patient).exists()):
        views.patient = searched_patient
        #data = {'successful': True}
    else:
        data = {'successful': False}
    return JsonResponse(data)

    
    

