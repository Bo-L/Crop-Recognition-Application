from django.shortcuts import render
from django.http import HttpResponse
from django_plant.utils import globalvar
import json
import os
# Create your views here.
def upload(request):
    if request.method == 'POST':
        # myFile = request.FILES.get('img',None)
        # fileName = myFile.name
        # fileSize = myFile.size
        myFile = request.FILES.get('img')
        number=request.POST.get('number')
        fileName = myFile.name
        imagePth= './pictures'+'/'+fileName
        with open(imagePth,'wb+') as saveFile:
            for chunk in myFile.chunks():
                saveFile.write(chunk)
        result=globalvar.get_value('model').inference(imagePth)
        result['number']=int(number)
        print(json.dumps(result,ensure_ascii=False))
        return HttpResponse(json.dumps(result,ensure_ascii=False))
