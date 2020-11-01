from django.urls import path
from .views import genre_view, keyword_view

app_name = 'parser'
urlpatterns = [
    path('genre/<genretype>/<lat>/<lng>', genre_view.as_view()),
    path('keyword/<keyword>/<lat>/<lng>', keyword_view.as_view()),
]