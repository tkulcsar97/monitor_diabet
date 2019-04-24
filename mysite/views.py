from django.shortcuts import render

logged = False
username = ''
password = ''

def index(request):
	return render(request, 'index.htm', {'logged': logged, 'username': username})

def analiza_glicemiei(request):
	return render(request, 'analiza_glicemiei.htm', {'logged': logged, 'username': username})

def autentificare(request):
	return render(request, 'autentificare.htm')

def inregistrare(request):
	return render(request, 'inregistrare.htm')

def reprezentarea_glicemiei(request):
	return render(request, 'reprezentarea_glicemiei.htm', {'logged': logged, 'username': username})

def stadializarea_nefropatiei_diabetice(request):
	return render(request, 'stadializarea_nefropatiei_diabetice.htm', {'logged': logged, 'username': username})

