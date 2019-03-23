from django.http import HttpResponse,JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Utilizator

def analiza_glicemiei(request):
	print('#############incarcam functia$$$$$$$$$$$')
	text = request.GET.get('text')
	data = {
	    'text': 'am primit:' + text
	}
	print(data)
	return JsonResponse(data)

def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        data = {'successful': True}
    else:
        data = {'successful': False}
    return JsonResponse(data)

def create_acount(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    birth_date = request.POST.get('birth_date')
    antibodies = request.POST.get('antibodies')
    onset_age = request.POST.get('onset_age')
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