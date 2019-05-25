from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Pacient, Variabilitate_Glicemie, Reprezentare_Glicemie, Rol, Risc_Hipoglicemie, Risc_Diabet, Nefropatie, Indice_SiMS
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
    date = datetime.date.today()

    user = authenticate(request, username=username, password=password)
    if user is not None:
        views.username = username
        views.password = password
        #user_for_role = User.objects.get(username=username)
        role = Rol.objects.get(user=user)
        views.role = role.id_rol
        pacient = Pacient.get(user=user)
        views.age = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
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
    date = datetime.date.today() 
    if(User.objects.filter(username=searched_patient).exists()):
        views.patient = searched_patient
        user = User.objects.get(username=views.patient)
        pacient = Pacient.objects.get(user=user)
        views.age = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
        #data = {'successful': True}
    else:
        data = {'successful': False}
    return JsonResponse(data)

def setare_date_nefropatie(request): #MEDIC
    zi = datetime.date.today()  
    rata_filtrare_glomerulara = request.GET.get('rata_filtrare_glomerulara')
    albuminurie = request.GET.get('albuminurie')
    unitate_masura = request.GET.get('unitate_masura')
    rezultat = request.GET.get('rezultat')
    try:
        user = User.objects.get(username=views.patient)
    except IntegrityError:
        data = {'successful': False}
    else:
        nefropatie = Nefropatie(user=user)
        nefropatie.data = zi
        nefropatie.rata_filtrare_glomerulara = rata_filtrare_glomerulara
        nefropatie.albuminuria = albuminurie
        nefropatie.unitate_masura = unitate_masura
        nefropatie.rezultat = rezultat
        nefropatie.save()
        data = {'successful': True}
    return JsonResponse(data)


def setare_date_risc_hipoglicemie(request): #MEDIC
    zi = datetime.date.today()  
    urgente_hipo = request.GET.get('urgente_hipo')
    urgente = request.GET.get('urgente')
    insulina = request.GET.get('insulina')
    sulfoniluree = request.GET.get('sulfoniluree')
    insuficienta_renala = request.GET.get('insuficienta_renala')
    varsta_sub_77 = request.GET.get('varsta_sub_77')
    rezultat = request.GET.get('rezultat')
    try:
        user = User.objects.get(username=views.patient)
    except IntegrityError:
        data = {'successful': False}
    else:
        risc_hipoglicemie = Risc_Hipoglicemie(user=user)
        risc_hipoglicemie.data = zi 
        risc_hipoglicemie.urgente_hipoglicemie = urgente_hipo
        risc_hipoglicemie.urgente = urgente
        risc_hipoglicemie.insulina = insulina
        risc_hipoglicemie.derivate_sulfoniluree = sulfoniluree
        risc_hipoglicemie.irc_severa_terminala = insuficienta_renala
        risc_hipoglicemie.varsta_sub_77 = varsta_sub_77
        risc_hipoglicemie.rezultat = rezultat
        risc_hipoglicemie.save()
        data = {'successful': True}
    return JsonResponse(data)

def setare_date_risc_diabet(request): #MEDIC
    zi = datetime.date.today()  
    glicemie_pe_nemancate = request.GET.get('glicemie_nemancate')
    glicemie_la_doua_ore = request.GET.get('glicemie_doua_ore')
    circumferinta_talie = request.GET.get('talie')
    hipertensiune = request.GET.get('hipertensiune')
    colesterol = request.GET.get('colesterol')
    hiperlipidemie = request.GET.get('hiperlipidemie')
    scor_cmds = request.GET.get('cmds')
    scor_cmds_modificat = request.GET.get('cmds_modificat')
    try:
        user = User.objects.get(username=views.patient)
    except IntegrityError:
        data = {'successful': False}
    else:
        risc_diabet = Risc_Diabet(user=user)
        risc_diabet.data = zi
        risc_diabet.conditie_glicemie_pe_nemancate = glicemie_pe_nemancate
        risc_diabet.conditie_glicemie_la_doua_ore = glicemie_la_doua_ore
        risc_diabet.conditie_circumferinta_talie = circumferinta_talie
        risc_diabet.conditie_hipertensiune = hipertensiune
        risc_diabet.conditie_colesterol = colesterol
        risc_diabet.conditie_hiperlipidemie = hiperlipidemie
        risc_diabet.scor_cmds = scor_cmds
        risc_diabet.scor_cmds_modificat = scor_cmds_modificat
        risc_diabet.save()
        data = {'successful': True}
    return JsonResponse(data)

def setare_date_indice_siMS(request): #MEDIC
    zi = datetime.date.today()  
    sex = request.GET.get('sex')
    diabet_familie = request.GET.get('diabet_familie')
    inaltime = request.GET.get('inaltime')
    talie = request.GET.get('talie')
    glicemia = request.GET.get('glicemia')
    trigliceride = request.GET.get('trigliceride')
    tensiune_sistolica = request.GET.get('tensiune_sistolica')
    colesterol = request.GET.get('colesterol')
    siMS_scor = request.GET.get('siMS_scor')
    siMS_scor_risc = request.GET.get('siMS_scor_risc')
    PsiMS_scor = request.GET.get('PsiMS_scor')
    siMS_scor_ref = request.GET.get('siMS_scor_ref')
    siMS_scor_risc_ref = request.GET.get('siMS_scor_risc_ref')
    try:
        user = User.objects.get(username=views.patient)
    except IntegrityError:
        data = {'successful': False}
    else:
        indice_sims = Indice_SiMS(user=user)
        indice_sims.data = zi
        indice_sims.sex = sex
        indice_sims.diabet_in_familie = diabet_familie
        indice_sims.inaltime = inaltime
        indice_sims.varsta = views.age 
        indice_sims.talie = talie
        indice_sims.glicemia = glicemia
        indice_sims.trigliceride = trigliceride
        indice_sims.tensiune_sistolica = tensiune_sistolica
        indice_sims.colesterol = colesterol
        indice_sims.siMS_scor = siMS_scor
        indice_sims.siMS_scor_risc = siMS_scor_risc
        indice_sims.PsiMS_scor = PsiMS_scor
        indice_sims.siMS_scor_ref = siMS_scor_ref
        indice_sims.siMS_scor_risc_ref = siMS_scor_risc_ref
        indice_sims.save()
        data = {'successful': True}
    return JsonResponse(data)  




    
    

