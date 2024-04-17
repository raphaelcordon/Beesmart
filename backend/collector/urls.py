from django.urls import path

from collector.views import CollectorValidateView

urlpatterns = [
    path('collector/validate/', CollectorValidateView.as_view()),

]
