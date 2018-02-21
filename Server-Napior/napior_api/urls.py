from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from napior_api import views

urlpatterns = [
    url(r'^napior_api/$', views.runCalculation.as_view()),
    url(r'^usgs_api/$', views.getUSGSData.as_view()),
    url(r'^subscription_api/$', views.updateSubscription.as_view()),
]
urlpatterns = format_suffix_patterns(urlpatterns)