from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .k_crawler import kakao_crawler
from .g_crawler import google_crawler

class genre_view(APIView):    
    def get(self,request, genretype, lat, lng):
        if genretype != "채식":
            return Response(kakao_crawler.get_keyword(self, genretype,lat,lng))
        else:
            return Response(google_crawler.get_vegan_near_data(self,lat,lng))



class keyword_view(APIView):    
    def get(self,request, keyword, lat, lng):
        return Response(kakao_crawler.get_place_data(self, keyword,lat,lng))
