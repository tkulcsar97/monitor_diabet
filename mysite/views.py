from django.shortcuts import render

logged = False
username = ''
role = 2 # 0, 1, 2

def index(request):
	return render(request, 'index.htm', {'logged': logged, 'username': username, 'role': role })

def analiza_glicemiei(request):
	return render(request, 'analiza_glicemiei.htm', {'logged': logged, 'username': username, 'role': role})

def autentificare(request):
	return render(request, 'autentificare.htm')

def inregistrare(request):
	return render(request, 'inregistrare.htm')

def reprezentarea_glicemiei(request):
	return render(request, 'reprezentarea_glicemiei.htm', {'logged': logged, 'username': username, 'role': role})

def stadializarea_nefropatiei_diabetice(request):
	return render(request, 'stadializarea_nefropatiei_diabetice.htm', {'logged': logged, 'username': username, 'role': role})

def calculator_hipoglicemic(request):
	return render(request, 'calculator_hipoglicemic.htm', {'logged': logged, 'username': username, 'role': role})

def calculator_diabet(request):
	return render(request, 'calculator_diabet.htm', {'logged': logged, 'username': username, 'role': role})

def siMS(request):
	return render(request, 'siMS.htm', {'logged': logged, 'username': username, 'role': role})
