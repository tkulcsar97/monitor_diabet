from django.shortcuts import render

username = ''
role = 2 # 0, 1, 2
patient = ''

def index(request):
	return render(request, 'index.htm', {'role': role, 'username': username})

def analiza_glicemiei(request):
	return render(request, 'analiza_glicemiei.htm', {'role': role, 'username': username})

def autentificare(request):
	return render(request, 'autentificare.htm')

def inregistrare(request):
	return render(request, 'inregistrare.htm')

def reprezentarea_glicemiei(request):
	return render(request, 'reprezentarea_glicemiei.htm', {'role': role, 'username': username})

def stadializarea_nefropatiei_diabetice(request):
	return render(request, 'stadializarea_nefropatiei_diabetice.htm', {'role': role, 'username': username})

def calculator_hipoglicemic(request):
	return render(request, 'calculator_hipoglicemic.htm', {'role': role, 'username': username})

def calculator_diabet(request):
	return render(request, 'calculator_diabet.htm', {'role': role, 'username': username})

def siMS(request):
	return render(request, 'siMS.htm', {'role': role, 'username': username})

