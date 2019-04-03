from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import Utilizator

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
    print (username)
    print (password)
    user = authenticate(request, username=username, password=password)
    if user is not None:
        data = {'successful': True}
    else:
        data = {'successful': False}
    print (data)
    return JsonResponse(data)


def create_account(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    birth_date = request.GET.get('birth_date')
    antibodies = request.GET.get('antibodies')
    onset_age = request.GET.get('onset_age')
    try:
        user = User.objects.create_user(username=username
                ,password=password)
    except IntegrityError:
        data = {'successful': False}
    else:
        utilizator = Utilizator(user=user)
        utilizator.data_nastere = birth_date
        utilizator.anticorpi = antibodies
        utilizator.varsta_debut = onset_age
        utilizator.save()
        data = {'successful': True}   
    return JsonResponse(data)
