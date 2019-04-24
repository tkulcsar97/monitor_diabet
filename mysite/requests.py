from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Utilizator, Variabilitate_Glicemie, Reprezentare_Glicemie
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
        data = {'successful': True}
    else:
        data = {'successful': False}

    return JsonResponse(data)

def create_account(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    birth_date = request.GET.get('birth_date')
    antibodies = request.GET.get('antibodies')
    onset_age = request.GET.get('onset_age')

    print (username)
    print (password)

    try:
        user = User.objects.create_user(username=username
                ,password=password)
    except IntegrityError as e:
        print(e)
        data = {'successful': False}
    else:
        utilizator = Utilizator(user=user)
        utilizator.data_nastere = birth_date
        utilizator.anticorpi = antibodies
        utilizator.varsta_debut = onset_age
        utilizator.save()
        data = {'successful': True}   
    return JsonResponse(data)

def logout():
    views.logged = False
    views.username = ''
    password = ''

def setare_date_analiza(request):
    date = request.GET.get('datetime') # de modificat datetime
    value = request.GET.get('valoare')
    try:
        user = User.objects.get(username=views.username)
    except IntegrityError:
        data = {'successful': False}
    else:
        analiza_glicemie = Variabilitate_Glicemie(id=user)
        temp_date = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
        analiza_glicemie.valoare_glicemie = value
        analiza_glicemie.data_ora = temp_date
        analiza_glicemie.save()
        {'successful': True}
    return JsonResponse(data)

def preluare_date_analiza(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    # temp_start = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')#aici vine si cu time?
    # temp_end = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
    temp_start = datetime.strptime(start_date, '%m-%d-%Y')#aici vine si cu time?
    temp_end = datetime.strptime(end_date, '%m-%d-%Y')
    user = User.objects.get(username=views.username)
    data = {}
    count = 0
    inregistrari_glicemie = Variabilitate_Glicemie.objects.all()
    for inregistrare_glicemie in inregistrari_glicemie:
        if(inregistrare_glicemie.user == user):
            if(inregistrare_glicemie.data_ora > temp_start and inregistrare_glicemie.data_ora < temp_end):
                count=count+1
                data['inreg'+str(count)] = {'date'+str(count): inregistrare_glicemie.data_ora, 'value'+str(count):
                inregistrare_glicemie.value}
    return JsonResponse(data)

def setare_date_reprezentare(request):
    date = request.GET.get('date')#de modificat in functie de ce e in form
    value = request.GET.get('valoare')
    moment = request.GET.get('moment')#de modificat in functie de ce e in form
    try:
        user = User.objects.get(username=views.username)
    except IntegrityError:
        data = {'successful': False}
    else:
        reprezentare_glicemie = Reprezentare_Glicemie(id=user)
        temp_date = datetime.strptime(date, '%Y-%m-%d').date()
        reprezentare_glicemie.valoare_glicemie = value
        reprezentare_glicemie.data = temp_date
        reprezentare_glicemie.moment_al_zilei = moment
        reprezentare_glicemie.save()
        {'successful': True}
    return JsonResponse(data)

def preluare_date_reprezentare(request):
    date = request.GET.get('zi_valoare')
    user = User.objects.get(username=views.username)
    temp_date = datetime.strptime(date, '%Y-%m-%d').date()
    data = {}
    count = 0
    inregistrari_grafic = Variabilitate_Glicemie.objects.all()
    for inregistrare_grafic in inregistrari_grafic:
        if(inregistrare_grafic.user == user):
            if(inregistrare_grafic.data == temp_date):
                count=count+1
                data['inreg'+str(count)] = {'date'+str(count): inregistrare_grafic.data, 'value'+str(count):
                inregistrare_grafic.value}
    return JsonResponse(data)


    
    

