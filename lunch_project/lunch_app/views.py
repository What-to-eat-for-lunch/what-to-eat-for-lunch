from django.http import HttpResponse
from django.shortcuts import render

#from .models import Question


def index(request):   
    return render(request,'lunch_app/index.html')

def alone(request):
    return render(request,'lunch_app/alone.html')

def map(request):
    return render(request,'lunch_app/map.html')

def together(request):
    return render(request,'lunch_app/together.html')

def diet(request):
    return render(request,'lunch_app/diet.html')

def cafe(request):
    return render(request,'lunch_app/cafe.html')