from django.urls import path
from . import views

urlpatterns = [
    # ex: /lunch_app/
    path('', views.index, name='index'),
    #/lunch_app/alone/
    path('alone/',views.alone,name='alone'),
    #/polls/alone/map/
    path('alone/map/',views.map,name='map'),

    #/lunch_app/together/
    path('together/',views.together,name='together'),
    #/lunch_app/together/map/
    path('together/map/',views.map,name='map'),

    #/lunch_app/diet/
    path('diet/',views.diet,name='diet'),
    #/lunch_app/diet/map/
    path('diet/map/',views.map,name='diet'),

     #/lunch_app/cafe/
    path('cafe/',views.cafe,name='cafe'),
    #/lunch_app/cafe/map/
    path('cafe/map/',views.map,name='cafe'),
]