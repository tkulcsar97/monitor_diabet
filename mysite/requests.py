from django.http import HttpResponse,JsonResponse

def analiza_glicemiei(request):
	print('#############incarcam functia$$$$$$$$$$$')
	text = request.GET.get('text')
	data = {
	    'text': 'am primit:' + text
	}
	print(data)
	return JsonResponse(data)

def login(request):
    print ('-------------Login function-------------')
    if request.POST['submit'] == 'login':
        user = request.POST.get('username')
        if Utilizator.objects.filter(nume_utilizator=user).exists():
            print ('Incercati sa va logati cu un username inexistent')
            data = {'text': 'Incercati sa va logati cu un username inexistent.'}
        else:
            print ('Login successfull')
            data = {'text': 'Login reusit cu: ' + user}
    return JsonResponse(data)
