from django.http import JsonResponse
from django.contrib.auth import authenticate
# from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.db.models import Q
# from django.db.models.base import ObjectDoesNotExist
from django.core.exceptions import ObjectDoesNotExist
from .models import Pacient, Variabilitate_Glicemie, Reprezentare_Glicemie, Rol, Risc_Hipoglicemie, Risc_Diabet, Nefropatie, Indice_SiMS, Medic
from . import views
from . import urls
import datetime
# import json 


# payload = json.dumps({"on":True})

def autentificare(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    date = datetime.date.today()

    user = authenticate(request, username=username, password=password)
    if user is not None:
        views.username = username
        views.password = password
        role = Rol.objects.get(user=user)
        views.role = role.id_rol
        if views.role == 1:
            pacient = Pacient.objects.get(user=user)
            views.age = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
        data = {'successful': True}
    else:
        data = {'successful': False}

    return JsonResponse(data)

def create_account(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    user_role = request.GET.get('rol')
    doctor = request.GET.get('doctor') 
    birth_date = request.GET.get('birth_date')
    onset_age = request.GET.get('onset_age')
    
    # clinica = request.GET.get('clinica')

    data = {'successful': False} 
    if(user_role == "pacient"):
        try:
            user = User.objects.create_user(username=username
                    ,password=password)
            user_medic = User.objects.get(username=doctor)
            medic = Medic.objects.get(user=user_medic)
            print("------------------", medic.id)
        except (IntegrityError, ObjectDoesNotExist) as e:
            print(e)
            data = {'successful': False}
        else:
            pacient = Pacient(user=user)
            pacient.data_nastere = birth_date
            pacient.varsta_debut = onset_age
            pacient.medic = medic
            pacient.save()
            rol = Rol(user=user)
            rol.id_rol = 1 # 1 -> pacient
            rol.save()
            data = {'successful': True} 
    if(user_role == "medic"):
        try:
            user_medic2 = User.objects.create_user(username=username
                    ,password=password)
        except (IntegrityError, ObjectDoesNotExist) as e:
            print(e)
            data = {'successful': False}
        else:
            medic = Medic(user=user_medic2)
            # medic.clinica = clinica
            medic.save()
            rol = Rol(user=user_medic2)
            rol.id_rol = 2 # 2 -> pacient
            rol.save()
            data = {'successful': True} 
    return JsonResponse(data)

def logout(request):
    views.username = ''
    views.role = 0
    views.patient = ''
    views.age = 0
    views.doctors = []
    return JsonResponse({'data': None})

def preluare_pacient(username):
    user = User.objects.get(username=username)
    pacient = Pacient.objects.get(user=user)
    return pacient

def setare_date_analiza(request):
    date = request.GET.get('moment_valoare')
    value = request.GET.get('valoare')
    print (date)
    print (value)
    try:
        pacient = preluare_pacient(views.username)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        try:
            analiza = Variabilitate_Glicemie.objects.get(data_ora=date)
        except ObjectDoesNotExist:
            analiza_glicemie = Variabilitate_Glicemie(pacient=pacient)
            #temp_date = datetime.strptime(date, '%Y-%m-%d %H:%M:%S')
            analiza_glicemie.valoare_glicemie = value
            analiza_glicemie.data_ora = date
            analiza_glicemie.save()
            data = {'successful': True}
        else:
            data = {'successful': "exista"}
    return JsonResponse(data)

def preluare_date_analiza(request):
    temp_start = datetime.datetime.strptime(request.GET.get('start_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    temp_end = datetime.datetime.strptime(request.GET.get('end_date'), "%Y-%m-%dT%H:%M:%S.%fZ") 
    if views.role == 1:
        pacient = preluare_pacient(views.username)
    else:
        pacient = preluare_pacient(views.patient)
    data = {}
    count = 0
    inregistrari_glicemie = Variabilitate_Glicemie.objects.filter(pacient=pacient)
    for inregistrare_glicemie in inregistrari_glicemie:
        if(inregistrare_glicemie.data_ora.date() >= temp_start.date() and inregistrare_glicemie.data_ora.date() <= temp_end.date()):
            count=count+1
            data['inreg'+str(count)] = {
                'date': inregistrare_glicemie.data_ora,
                'value': inregistrare_glicemie.valoare_glicemie}
    return JsonResponse(data)

def setare_date_reprezentare(request):
    date = datetime.datetime.strptime(request.GET.get('date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    value = request.GET.get('valoare')
    moment = request.GET.get('moment')
    try:
        pacient = preluare_pacient(views.username)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        try:
            reprezentare = Reprezentare_Glicemie.objects.get(data=date.date(), moment_al_zilei=moment)
        except ObjectDoesNotExist:
            reprezentare_glicemie = Reprezentare_Glicemie(pacient=pacient)
            #temp_date = datetime.strptime(date, '%Y-%m-%d').date()
            reprezentare_glicemie.valoare_glicemie = value
            reprezentare_glicemie.data = date.date()
            reprezentare_glicemie.moment_al_zilei = moment
            reprezentare_glicemie.save()
            data = {'successful': True}
        else:
            # data = {'successful': False}
            data = {'successful': "exista"}
    return JsonResponse(data)

def preluare_date_reprezentare(request):
    date = datetime.datetime.strptime(request.GET.get('zi_valoare'), "%Y-%m-%dT%H:%M:%S.%fZ")
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        pacient = preluare_pacient(views.patient) # request de catre medic
    #temp_date = datetime.strptime(date, '%Y-%m-%d').date()
    data = {}
    inregistrari_grafic = Reprezentare_Glicemie.objects.filter(pacient=pacient, data=date.date())
    inregistrari_grafic = inregistrari_grafic.extra(select={
              'ora': "SUBSTR('moment_al_zilei', 1, 4)",
              'cifra': "CAST(substr(moment_al_zilei, 5) AS UNSIGNED)"})
    inregistrari_grafic = inregistrari_grafic.order_by('cifra')
    for inregistrare_grafic in inregistrari_grafic:
        data[inregistrare_grafic.moment_al_zilei] = inregistrare_grafic.valoare_glicemie
    print(data)
    return JsonResponse(data)

def cautare_pacient(request):
    searched_patient = request.GET.get('pacient')
    date = datetime.date.today() 
    try:
        u = User.objects.get(username=searched_patient)
        m = User.objects.get(username=views.username)
        medic = Medic.objects.get(user = m) 
        p = Pacient.objects.get(user=u, medic=medic)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        views.patient = searched_patient
        user = User.objects.get(username=views.patient)
        pacient = Pacient.objects.get(user=user)
        views.age = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
        data = {'successful': True}
    return JsonResponse(data)

def deselectare_pacient(request):
    views.patient = ''
    return JsonResponse({'data': None})
    
def setare_date_nefropatie(request): #MEDIC
    zi = datetime.date.today()  
    rata_filtrare_glomerulara = request.GET.get('rata_filtrare_glomerulara')
    albuminurie = request.GET.get('albuminurie')
    unitate_masura = request.GET.get('unitate_masura')
    rezultat = request.GET.get('rezultat')
    try:
       pacient = preluare_pacient(views.patient)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        nefropatie = Nefropatie(pacient=pacient)
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
        pacient = preluare_pacient(views.patient)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        risc_hipoglicemie = Risc_Hipoglicemie(pacient=pacient)
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
    risc_cmds = request.GET.get('risc_cmds')
    risc_cmds_modificat = request.GET.get('risc_cmds_modificat')
    try:
        pacient = preluare_pacient(views.patient)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        risc_diabet = Risc_Diabet(pacient=pacient)
        risc_diabet.data = zi
        risc_diabet.conditie_glicemie_pe_nemancate = glicemie_pe_nemancate
        risc_diabet.conditie_glicemie_la_doua_ore = glicemie_la_doua_ore
        risc_diabet.conditie_circumferinta_talie = circumferinta_talie
        risc_diabet.conditie_hipertensiune = hipertensiune
        risc_diabet.conditie_colesterol = colesterol
        risc_diabet.conditie_hiperlipidemie = hiperlipidemie
        risc_diabet.scor_cmds = scor_cmds
        risc_diabet.scor_cmds_modificat = scor_cmds_modificat
        risc_diabet.risc_cmds = risc_cmds
        risc_diabet.risc_cmds_modificat = risc_cmds_modificat
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
    rezultat = request.GET.get('rezultat')
    try:
        pacient = preluare_pacient(views.patient)
    except ObjectDoesNotExist:
        data = {'successful': False}
    else:
        indice_sims = Indice_SiMS(pacient=pacient)
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
        indice_sims.rezultat = rezultat
        indice_sims.save()
        data = {'successful': True}
    return JsonResponse(data)  

def preluare_date_nefropatie(request): #MEDIC
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        if views.role == 2:
            pacient = preluare_pacient(views.patient) # request de catre medic
        else:
            data = {'array': None}
    array_nefropatie = []
    inregistrari_nefropatie = Nefropatie.objects.filter(pacient=pacient)
    for inregistrare_nefropatie in inregistrari_nefropatie:
        array_nefropatie.append({
            'zi': inregistrare_nefropatie.data,
            'rata_filtrare_glomerulara': inregistrare_nefropatie.rata_filtrare_glomerulara,
            'albuminuria': inregistrare_nefropatie.albuminuria,
            'unitate_masura': inregistrare_nefropatie.unitate_masura,
            'rezultat': inregistrare_nefropatie.rezultat
        })
    data = {'array': array_nefropatie}            
    return JsonResponse(data)

def preluare_date_risc_hipoglicemie(request): #MEDIC
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        if views.role == 2:
            pacient = preluare_pacient(views.patient) # request de catre medic
        else:
            data = {'array': None}
    array_hipoglicemie = []
    inregistrari_hipoglicemie = Risc_Hipoglicemie.objects.filter(pacient=pacient)
    for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
        array_hipoglicemie.append({
            'zi': inregistrare_hipoglicemie.data,
            'urgente_hipo': inregistrare_hipoglicemie.urgente_hipoglicemie,
            'urgente': inregistrare_hipoglicemie.urgente,
            'insulina': inregistrare_hipoglicemie.insulina,
            'derivate_sulfoniluree': inregistrare_hipoglicemie.derivate_sulfoniluree,
            'insuficienta_renala': inregistrare_hipoglicemie.irc_severa_terminala,
            'varsta_sub_77': inregistrare_hipoglicemie.varsta_sub_77,
            'rezultat': inregistrare_hipoglicemie.rezultat
        })
    data = {'array': array_hipoglicemie}             
    return JsonResponse(data)

def preluare_date_risc_diabet(request): #MEDIC
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        if views.role == 2:
            pacient = preluare_pacient(views.patient) # request de catre medic
        else:
            data = {'array': None}
    array_diabet = []
    inregistrari_diabet = Risc_Diabet.objects.filter(pacient=pacient)
    for inregistrare_diabet in inregistrari_diabet:
        array_diabet.append({
            'zi': inregistrare_diabet.data,
            'glicemie_nemancate': inregistrare_diabet.conditie_glicemie_pe_nemancate,
            'glicemie_doua_ore': inregistrare_diabet.conditie_glicemie_la_doua_ore,
            'talie': inregistrare_diabet.conditie_circumferinta_talie,
            'hipertensiune': inregistrare_diabet.conditie_hipertensiune,
            'colesterol': inregistrare_diabet.conditie_colesterol,
            'hiperlipidemie': inregistrare_diabet.conditie_hiperlipidemie,
            'scor_cmds': inregistrare_diabet.scor_cmds,
            'scor_cmds_modificat': inregistrare_diabet.scor_cmds_modificat,
            'risc_cmds': inregistrare_diabet.risc_cmds,
            'risc_cmds_modificat': inregistrare_diabet.risc_cmds_modificat
        })
    data = {'array': array_diabet}          
    return JsonResponse(data)

def preluare_date_indice_siMS(request): #MEDIC
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        if views.role == 2:
            pacient = preluare_pacient(views.patient) # request de catre medic
        else:
            data = {'array': None}
    array_siMS = []
    inregistrari_siMS = Indice_SiMS.objects.filter(pacient=pacient)
    for inregistrare_siMS in inregistrari_siMS:
        array_siMS.append({
            'zi': inregistrare_siMS.data,
            'sex': inregistrare_siMS.sex,
            'diabet_familie': inregistrare_siMS.diabet_in_familie,
            'inaltime': inregistrare_siMS.inaltime,
            'varsta': inregistrare_siMS.varsta,
            'talie': inregistrare_siMS.talie,
            'glicemia': inregistrare_siMS.glicemia,
            'trigliceride': inregistrare_siMS.trigliceride,
            'tensiune_sistolica': inregistrare_siMS.tensiune_sistolica,
            'colesterol': inregistrare_siMS.colesterol,
            'siMS_scor': inregistrare_siMS.siMS_scor,
            'siMS_scor_risc': inregistrare_siMS.siMS_scor_risc,
            'PsiMS_scor': inregistrare_siMS.PsiMS_scor,
            'siMS_scor_ref': inregistrare_siMS.siMS_scor_ref,
            'siMS_scor_risc_ref': inregistrare_siMS.siMS_scor_risc_ref,
            'rezultat': inregistrare_siMS.rezultat
        })
    data = {'array': array_siMS}          
    return JsonResponse(data)

def preluare_date_tabel_analiza(request): #MEDIC
    temp_start = datetime.datetime.strptime(request.GET.get('start_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    temp_end = datetime.datetime.strptime(request.GET.get('end_date'), "%Y-%m-%dT%H:%M:%S.%fZ") 
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        pacient = preluare_pacient(views.patient) # request de catre medic
    array_analiza = []
    inregistrari_analiza = Variabilitate_Glicemie.objects.filter(pacient=pacient).order_by('data_ora')
    for inregistrare_analiza in inregistrari_analiza:
        if(inregistrare_analiza.data_ora.date() >= temp_start.date() and inregistrare_analiza.data_ora.date() <= temp_end.date()):
            array_analiza.append({
                'data_ora': inregistrare_analiza.data_ora.replace(tzinfo=None),
                'valoare': inregistrare_analiza.valoare_glicemie
            })
    data = {'array': array_analiza}         
    return JsonResponse(data)

def preluare_date_tabel_reprezentare(request): #MEDIC
    temp_start = datetime.datetime.strptime(request.GET.get('start_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    temp_end = datetime.datetime.strptime(request.GET.get('end_date'), "%Y-%m-%dT%H:%M:%S.%fZ")
    if views.role == 1:
        pacient = preluare_pacient(views.username) # request de catre pacient
    else:
        pacient = preluare_pacient(views.patient) # request de catre medic
    array_reprezentare = []
    inregistrari_grafic = Reprezentare_Glicemie.objects.filter(pacient=pacient)
    inregistrari_grafic = inregistrari_grafic.extra(select={
              'ora': "SUBSTR('moment_al_zilei', 1, 4)",
              'cifra': "CAST(SUBSTR(moment_al_zilei, 5) AS UNSIGNED)"})
    inregistrari_grafic = inregistrari_grafic.order_by('data','cifra')
    for inregistrare_grafic in inregistrari_grafic:
        if(inregistrare_grafic.data >= temp_start.date() and inregistrare_grafic.data <= temp_end.date()):
            array_reprezentare.append({
                'data': inregistrare_grafic.data,
                'moment': inregistrare_grafic.moment_al_zilei,
                'valoare': inregistrare_grafic.valoare_glicemie
            })
    data = {'array': array_reprezentare}
    return JsonResponse(data)

def statistica_nefropatie(request):
    varsta_debut_start = request.GET.get('debut_start')
    varsta_debut_stop = request.GET.get('debut_stop')
    varsta_start = request.GET.get('varsta_start')
    varsta_stop = request.GET.get('varsta_stop')
    rezultat = request.GET.get('rezultat')
    data_start = datetime.datetime.strptime(request.GET.get('data_start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    data_stop = datetime.datetime.strptime(request.GET.get('data_stop'), "%Y-%m-%dT%H:%M:%S.%fZ")
    date = datetime.date.today()
    medic_user = User.objects.get(username=views.username) 
    medic = Medic.objects.get(user=medic_user)
    data = {}
    nr_cazuri = 0
    array_rezultate = ["Risc scăzut de ND", "Risc moderat de ND", "Risc crescut de ND", "Risc foarte crescut de ND"]
    if(rezultat != "Toate rezultatele"):
        inregistrari_nefropatie = Nefropatie.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rezultat))
        if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_nefropatie in inregistrari_nefropatie:
                        # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
        else:
            if(varsta_debut_start != '' and varsta_debut_stop != ''):
                for inregistrare_nefropatie in inregistrari_nefropatie:
                    # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                    if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                        nr_cazuri = nr_cazuri + 1
            if(varsta_start != '' and varsta_stop != ''):
                for inregistrare_nefropatie in inregistrari_nefropatie:
                    # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                    varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                    if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                        nr_cazuri = nr_cazuri + 1

        if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
            for inregistrare_nefropatie in inregistrari_nefropatie:
                # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                if(pacient.medic_id == medic.id):
                   nr_cazuri = nr_cazuri + 1
                print(nr_cazuri)
        data['numar_cazuri'] = nr_cazuri
        inreg = Nefropatie.objects.all()
        total = 0
        for inregistrare in inreg:
            pacient = Pacient.objects.get(id = inregistrare.pacient_id)
            if(pacient.medic_id == medic.id):
                total = total + 1
        data['total_cazuri'] = total
    else:
        for rez in array_rezultate:
            nr_cazuri = 0
            inregistrari_nefropatie = Nefropatie.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rez))
            if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_nefropatie in inregistrari_nefropatie:
                        # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
            else:
                if(varsta_debut_start != '' and varsta_debut_stop != ''):
                    for inregistrare_nefropatie in inregistrari_nefropatie:
                        # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                        if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
                if(varsta_start != '' and varsta_stop != ''):
                    for inregistrare_nefropatie in inregistrari_nefropatie:
                        # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                            nr_cazuri = nr_cazuri + 1

            if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
                for inregistrare_nefropatie in inregistrari_nefropatie:
                    # user = User.objects.get(id = inregistrare_nefropatie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_nefropatie.pacient_id)
                    if(pacient.medic_id == medic.id):
                       nr_cazuri = nr_cazuri + 1
            data[rez] = nr_cazuri
    return JsonResponse(data)

def statistica_hipoglicemie(request):
    varsta_debut_start = request.GET.get('debut_start')
    varsta_debut_stop = request.GET.get('debut_stop')
    varsta_start = request.GET.get('varsta_start')
    varsta_stop = request.GET.get('varsta_stop')
    rezultat = request.GET.get('rezultat')
    data_start = datetime.datetime.strptime(request.GET.get('data_start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    data_stop = datetime.datetime.strptime(request.GET.get('data_stop'), "%Y-%m-%dT%H:%M:%S.%fZ")
    date = datetime.date.today()
    medic_user = User.objects.get(username=views.username) 
    medic = Medic.objects.get(user=medic_user)
    data = {}
    nr_cazuri = 0
    array_rezultate = ["risc-scazut", "risc-interm", "risc-ridicat"]
    if(rezultat != "Toate rezultatele"):
        inregistrari_hipoglicemie = Risc_Hipoglicemie.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rezultat))
        if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                        # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
        else:
            if(varsta_debut_start != '' and varsta_debut_stop != ''):
                for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                    # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                    if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                        nr_cazuri = nr_cazuri + 1
            if(varsta_start != '' and varsta_stop != ''):
                for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                    # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                    varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                    if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                        nr_cazuri = nr_cazuri + 1

        if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
            for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                if(pacient.medic_id == medic.id):
                   nr_cazuri = nr_cazuri + 1
                print(nr_cazuri)
        data['numar_cazuri'] = nr_cazuri
        inreg = Risc_Hipoglicemie.objects.all()
        total = 0
        for inregistrare in inreg:
            pacient = Pacient.objects.get(id = inregistrare.pacient_id)
            if(pacient.medic_id == medic.id):
                total = total + 1
        data['total_cazuri'] = total
    else:
        for rez in array_rezultate:
            nr_cazuri = 0
            inregistrari_hipoglicemie = Risc_Hipoglicemie.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rez))
            if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                        # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
            else:
                if(varsta_debut_start != '' and varsta_debut_stop != ''):
                    for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                        # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                        if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
                if(varsta_start != '' and varsta_stop != ''):
                    for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                        # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                            nr_cazuri = nr_cazuri + 1

            if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
                for inregistrare_hipoglicemie in inregistrari_hipoglicemie:
                    # user = User.objects.get(id = inregistrare_hipoglicemie.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_hipoglicemie.pacient_id)
                    if(pacient.medic_id == medic.id):
                       nr_cazuri = nr_cazuri + 1
            data[rez] = nr_cazuri
    return JsonResponse(data)

def statistica_diabet(request):
    varsta_debut_start = request.GET.get('debut_start')
    varsta_debut_stop = request.GET.get('debut_stop')
    varsta_start = request.GET.get('varsta_start')
    varsta_stop = request.GET.get('varsta_stop')
    risc = request.GET.get('rezultat')
    data_start = datetime.datetime.strptime(request.GET.get('data_start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    data_stop = datetime.datetime.strptime(request.GET.get('data_stop'), "%Y-%m-%dT%H:%M:%S.%fZ")
    date = datetime.date.today()
    medic_user = User.objects.get(username=views.username) 
    medic = Medic.objects.get(user=medic_user)
    data = {}
    nr_cazuri = 0
    array_rezultate = ["≤7", "≤10", "≤11", "≤13", "≤16", "≤18", "≤23" , "≤24" , "≤32" , "≤33" , "≤43", "≤59", ">43", ">59"]
    if(risc != "Toate rezultatele"):
        inregistrari_diabet = Risc_Diabet.objects.filter((Q(risc_cmds=risc)|Q(risc_cmds_modificat=risc))&(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())))
        if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_diabet in inregistrari_diabet:
                        # user = User.objects.get(id = inregistrare_diabet.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
        else:
            if(varsta_debut_start != '' and varsta_debut_stop != ''):
                for inregistrare_diabet in inregistrari_diabet:
                    # user = User.objects.get(id = inregistrare_diabet.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                    if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                        nr_cazuri = nr_cazuri + 1
            if(varsta_start != '' and varsta_stop != ''):
                for inregistrare_diabet in inregistrari_diabet:
                    # user = User.objects.get(id = inregistrare_diabet.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                    varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                    if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                        nr_cazuri = nr_cazuri + 1

        if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
            for inregistrare_diabet in inregistrari_diabet:
                # user = User.objects.get(id = inregistrare_diabet.user_id) 
                pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                if(pacient.medic_id == medic.id):
                   nr_cazuri = nr_cazuri + 1
                print(nr_cazuri)
        data['numar_cazuri'] = nr_cazuri
        inreg = Risc_Diabet.objects.all()
        total = 0
        for inregistrare in inreg:
            pacient = Pacient.objects.get(id = inregistrare.pacient_id)
            if(pacient.medic_id == medic.id):
                total = total + 1
        data['total_cazuri'] = total
    else:
        for rez in array_rezultate:
            nr_cazuri = 0
            inregistrari_diabet = Risc_Diabet.objects.filter((Q(risc_cmds=rez)|Q(risc_cmds_modificat=rez))&(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())))
            if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_diabet in inregistrari_diabet:
                        # user = User.objects.get(id = inregistrare_diabet.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
            else:
                if(varsta_debut_start != '' and varsta_debut_stop != ''):
                    for inregistrare_diabet in inregistrari_diabet:
                        # user = User.objects.get(id = inregistrare_diabet.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                        if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
                if(varsta_start != '' and varsta_stop != ''):
                    for inregistrare_diabet in inregistrari_diabet:
                        # user = User.objects.get(id = inregistrare_diabet.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                            nr_cazuri = nr_cazuri + 1

            if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
                for inregistrare_diabet in inregistrari_diabet:
                    # user = User.objects.get(id = inregistrare_diabet.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_diabet.pacient_id)
                    if(pacient.medic_id == medic.id):
                       nr_cazuri = nr_cazuri + 1
            data[rez] = nr_cazuri
    return JsonResponse(data)

def statistica_indice_siMS(request):
    varsta_debut_start = request.GET.get('debut_start')
    varsta_debut_stop = request.GET.get('debut_stop')
    varsta_start = request.GET.get('varsta_start')
    varsta_stop = request.GET.get('varsta_stop')
    rezultat = request.GET.get('rezultat')
    data_start = datetime.datetime.strptime(request.GET.get('data_start'), "%Y-%m-%dT%H:%M:%S.%fZ")
    data_stop = datetime.datetime.strptime(request.GET.get('data_stop'), "%Y-%m-%dT%H:%M:%S.%fZ")
    date = datetime.date.today()
    medic_user = User.objects.get(username=views.username) 
    medic = Medic.objects.get(user=medic_user)
    data = {}
    nr_cazuri = 0
    array_rezultate = ["Sindrom metabolic", "Sănătos"]
    if(rezultat != "Toate rezultatele"):
        inregistrari_siMS = Indice_SiMS.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rezultat))
        if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_siMS in inregistrari_siMS:
                        # user = User.objects.get(id = inregistrare_siMS.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
        else:
            if(varsta_debut_start != '' and varsta_debut_stop != ''):
                for inregistrare_siMS in inregistrari_siMS:
                    # user = User.objects.get(id = inregistrare_siMS.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                    if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                        nr_cazuri = nr_cazuri + 1
            if(varsta_start != '' and varsta_stop != ''):
                for inregistrare_siMS in inregistrari_siMS:
                    # user = User.objects.get(id = inregistrare_siMS.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                    varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                    if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                        nr_cazuri = nr_cazuri + 1

        if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
            for inregistrare_siMS in inregistrari_siMS:
                # user = User.objects.get(id = inregistrare_siMS.user_id) 
                pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                if(pacient.medic_id == medic.id):
                   nr_cazuri = nr_cazuri + 1
                print(nr_cazuri)
        data['numar_cazuri'] = nr_cazuri
        inreg = Indice_SiMS.objects.all()
        total = 0
        for inregistrare in inreg:
            pacient = Pacient.objects.get(id = inregistrare.pacient_id)
            if(pacient.medic_id == medic.id):
                total = total + 1
        data['total_cazuri'] = total
    else:
        for rez in array_rezultate:
            nr_cazuri = 0
            inregistrari_siMS = Indice_SiMS.objects.filter(Q(data__gte=data_start.date())&Q(data__lte=data_stop.date())&Q(rezultat=rez))
            if(varsta_debut_start != '' and varsta_debut_stop != '' and varsta_start != '' and varsta_stop != ''):
                    for inregistrare_siMS in inregistrari_siMS:
                        # user = User.objects.get(id = inregistrare_siMS.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop) and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
            else:
                if(varsta_debut_start != '' and varsta_debut_stop != ''):
                    for inregistrare_siMS in inregistrari_siMS:
                        # user = User.objects.get(id = inregistrare_siMS.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                        if(pacient.medic_id == medic.id and pacient.varsta_debut >= int(varsta_debut_start) and pacient.varsta_debut <= int(varsta_debut_stop)):
                            nr_cazuri = nr_cazuri + 1
                if(varsta_start != '' and varsta_stop != ''):
                    for inregistrare_siMS in inregistrari_siMS:
                        # user = User.objects.get(id = inregistrare_siMS.user_id) 
                        pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                        varsta = date.year - pacient.data_nastere.year - ((date.month, date.day) < (pacient.data_nastere.month, pacient.data_nastere.day))
                        if(pacient.medic_id == medic.id and varsta >= int(varsta_start) and varsta <= int(varsta_stop)):
                            nr_cazuri = nr_cazuri + 1

            if(varsta_debut_start == '' and varsta_debut_stop == '' and varsta_start == '' and varsta_stop == ''):
                for inregistrare_siMS in inregistrari_siMS:
                    # user = User.objects.get(id = inregistrare_siMS.user_id) 
                    pacient = Pacient.objects.get(id = inregistrare_siMS.pacient_id)
                    if(pacient.medic_id == medic.id):
                       nr_cazuri = nr_cazuri + 1
            data[rez] = nr_cazuri
    return JsonResponse(data)


def preluare_medici():
    medici = Medic.objects.all()
    for medic in medici:
        medic_user = User.objects.get(id=medic.user_id)
        views.doctors.append({
            'username': medic_user.username,
            'first_name': medic_user.first_name,
            'last_name': medic_user.last_name
        })

preluare_medici()