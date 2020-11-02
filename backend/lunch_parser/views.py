from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .k_crawler import kakao_crawler
from .g_crawler import google_crawler

import random

class genre_view(APIView):    
    def get(self,request, genretype, lat, lng):
        # 채식은 구글 API를 이용해 크롤링 하기때문에 따로 분류한다.
        if genretype == "채식":
            return Response(google_crawler.get_vegan_near_data(self,lat,lng))
        # 장르에 랜덤 파트가 있다.
        # 주변에 위치한 1차 분류를 얻어온다.
        elif genretype == "랜덤":
            result = kakao_crawler.get_category(self, lat,lng)
            if(len(result) == 0):
                return "Null"
            else:
                # random.choice()를 이용해 주변에 위치한 가게 분류 중 1개를 무작위로 선택한다.
                # 해당 분류의 2차 분류를 리턴한다.
                return Response(kakao_crawler.get_keyword(self, random.choice(result) ,lat,lng))
        else:
            return Response(kakao_crawler.get_keyword(self, genretype,lat,lng))
    

# 2차 분류에 해당하는 음식점들을 크롤링하는 클래스
class keyword_view(APIView):    
    def get(self,request, keyword, lat, lng):
        return Response(kakao_crawler.get_place_data(self, keyword,lat,lng))


