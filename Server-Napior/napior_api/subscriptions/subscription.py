import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_KEY

class Subscription(object):

    def __init__(self, data):
        self.requestType = data['requestType']
        if self.requestType == 'createUserAndSub':
            self.email = data['email']
            self.token = data['token']
            self.companyName = data['companyName']
            self.companyId = data['companyId']
        elif self.requestType == 'cancelSub':
            self.subscriptionId = data['subscriptionId']
        elif self.requestType == 'checkSub':
            self.customerId =data['customerId']

    def createCustomer(self):
        self.response = stripe.Customer.create(
            email=self.email,
            description=self.companyName,
            metadata={"companyId":self.companyId},
            source=self.token,
            plan='loads'
        )

    def cancelSubscription(self):       
        def cancel(sub):
            try:
                sub.delete()
                print('success')
                return {'deletedSubscription':True}
            except:
                print('failed')
                return {'deletedSubscription':False}
        
        subscription = stripe.Subscription.retrieve(self.subscriptionId)
        self.response = cancel(subscription)

    def checkSubscription(self):
        customer = stripe.Customer.retrieve(self.customerId)
        self.response = customer


    def stripeRequest(self):
        if self.requestType == 'createUserAndSub':
            self.createCustomer()
        elif self.requestType == 'cancelSub':
            self.cancelSubscription()
        elif self.requestType == 'checkSub':
            self.checkSubscription()
