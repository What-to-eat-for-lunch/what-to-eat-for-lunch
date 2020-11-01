from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .crawler import data_crawler
# Create your views here.

class genre_view(APIView):    
    def get(self,request, genretype, x, y):
        return Response(data_crawler.get_keyword(self, genretype,x,y))

class keyword_view(APIView):    
    def get(self,request, keyword, x, y):
        return Response(data_crawler.get_place_data(self, keyword,x,y))
