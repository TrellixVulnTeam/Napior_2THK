from django.shortcuts import render
from django.template import loader
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
import requests
import xmltodict
from xml.etree import ElementTree
from napior_api.calculations.calculationRouter import routeCalculation
from napior_api.subscriptions.subscription import Subscription

class runCalculation(APIView):
            
    def post(self, request, format=None):
        calcOutputs = routeCalculation.runCalculaton(self, request.data)
        return Response(calcOutputs, status=status.HTTP_200_OK)

class getUSGSData(APIView):
            
    def post(self, request, format=None):

        latitude = str(request.data['latitude'])
        longitude = str(request.data['longitude'])
        siteClass = str(request.data['siteClass'])
        riskCategory = str(request.data['riskCategory'])

        url = 'https://earthquake.usgs.gov/designmaps/us/inc/data-api.inc.php?latitude='+ latitude +'&longitude='+ longitude +'&edition=ibc-2009&variant=0&siteclass='+ siteClass +'&riskcategory='+ riskCategory
        usgsRequest = requests.get(url)
        xmlString = usgsRequest.content
        usgsAll = dict(xmltodict.parse(xmlString))
        usgsOutput = dict(usgsAll['output'])
        usgsData = {
            'latitude': usgsOutput['latitude'],
            'longitude': usgsOutput['longitude'],
            'Fa': usgsOutput['fa'],
            'Fv': usgsOutput['fv'],
            'Ss': usgsOutput['ss'],
            'S1': usgsOutput['s1'],
            'Sds': usgsOutput['sds'],
            'Sd1': usgsOutput['sd1'],
            'Tl': usgsOutput['tl']
        }

        return Response(usgsData, status=status.HTTP_200_OK)

class updateSubscription(APIView):

    def post(self, request, format=None):
        sub = Subscription(request.data)
        sub.stripeRequest()

        return Response(sub.response, status=status.HTTP_200_OK)
    