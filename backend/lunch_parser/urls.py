from django.urls import path
from .views import genre_view, keyword_view

app_name = 'parser'
urlpatterns = [
    path('genre/<genretype>/<x>/<y>', genre_view.as_view()),
    path('keyword/<keyword>/<x>/<y>', keyword_view.as_view()),
]