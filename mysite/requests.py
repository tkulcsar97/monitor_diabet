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
    user = request.POST.get('username')
    if Utilizator.objects.filter(nume_utilizator=user).exists():
        print ('Login successfull')
        data = {'text': 'Login reusit cu: ' + user}
    else:
        print ('Incercati sa va logati cu un username inexistent')
        data = \
            {'text': 'Incercati sa va logati cu un username inexistent.'}
    return JsonResponse(data)