import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RtdbService } from '../../common/rtdb.service';
import { AuthService } from '../../common/auth.service';
import {
  StripeService,
  StripeCardComponent,
  Elements,
  Element as StripeElement,
  ElementOptions,
  ElementsOptions
} from 'ngx-stripe';
import { Plans } from './plans';
import { Background } from '../../common/napior-images';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  email: string;
  group: string;
  subscribingStatus = 'not';
  cancellingStatus = 'not';
  stripeTest: FormGroup;
  elements: Elements;
  card: StripeElement;
  cardExpiry: StripeElement;
  cardCvc: StripeElement;
  cancel: string;
  cancelError: string;
  planTitle = new Plans();
  public backgroundImageObject = new Background();
  public backgroundCSS = this.backgroundImageObject.backgroundCSSJSON;

  @ViewChild('card') cardRef: ElementRef;

  cardOptions: ElementOptions = {
    style: {
      base: {
        color: '#32325D',
        fontWeight: 500,
        fontFamily: 'Helvetica, Roboto, verdana',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        '::placeholder': {
          color: '#CFD7DF'
        },
        ':-webkit-autofill': {
          color: '#e39f48'
        }
      },
      invalid: {
        color: '#E25950',

        '::placeholder': {
          color: '#FFCCA5'
        }
      }
    }
  };

  constructor(
    public rtdb: RtdbService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.rtdb.getCoAndUserData();
    this.stripeTest = this.fb.group({
      name: ['loads', [Validators.required]]
    });

    this.stripeService.elements().subscribe(elements => {
      this.elements = elements;

      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', this.cardOptions);
        this.card.mount(this.cardRef.nativeElement);
      }
    });
  }

  // Start or update a subscription.
  updatePlan() {
    this.subscribingStatus = 'subscribing';
    this.createPaymentToken(this.card).pipe( // 1) Create stripe token.
      concatMap(token => this.createUserAndSubscription(token)), // 2) Create user and subscription in stripe.
      concatMap(response => this.subscriptionToDatabase(response)) // 3) Update data in Firebase.
    ) 
      
      .subscribe({
        next: () => {
          this.subscribingStatus = 'subscribed';
          this.cancellingStatus = 'not';
        },
        error: err => {
          this.subscribingStatus = 'not';
          console.log(err);
        },
        complete: () => {
          this.subscribingStatus = 'subscribed';
        }
      });
  }

  //  1) Create stripe token.
  createPaymentToken(card) {
    return this.stripeService.createToken(card, { name });
  }

  //  2) Create user and subscription in stripe.
  createUserAndSubscription(token) {
    const data = {
      requestType: 'createUserAndSub',
      token: token.token.id,
      email: this.rtdb.userData.email,
      companyId: this.rtdb.userData.companyId,
      companyName: this.rtdb.companyData.name
    };
    const apiUrl = '/subscription_api';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(apiUrl, data, options);
  }

  // 3) Update data in Firebase.
  subscriptionToDatabase(response) {
    const customer: any = JSON.parse(response._body);
    console.log(customer);
    this.rtdb.companyData.paid = true;
    this.rtdb.companyData.plan = customer.subscriptions.data[0].plan.id;
    this.rtdb.companyData.subscriptionFee = customer.subscriptions.data[0].plan.amount / 100;
    this.rtdb.companyData.lastBilled = customer.subscriptions.data[0].current_period_start * 1000;
    this.rtdb.companyData.nextBill = customer.subscriptions.data[0].current_period_end * 1000;
    this.rtdb.companyData.stripeId = customer.id;
    this.rtdb.companyData.stripeSubscriptionId = customer.subscriptions.data[0].id;
    console.log(customer);
    console.log(this.rtdb.companyData);
    console.log(this.rtdb.userData.companyId);
    return this.rtdb.db
      .object('/companies/' + this.rtdb.userData.companyId)
      .set(this.rtdb.companyData);
  }

  // Cancel a subscription.
  cancelSubscription() {
    if (this.cancel === 'cancel') {
      this.cancelError = '';
      this.cancellingStatus = 'cancelling';
      this.cancelStripeSub()
        .pipe(concatMap(response => this.cancelSubInDatabase(response)))
        .subscribe({
          next: response => {
            if (this.rtdb.companyData.plan === 'cancelled') {
              this.cancellingStatus = 'cancelled';
              this.subscribingStatus = 'not';
            } else {
              this.cancellingStatus = 'not';
              this.cancelError =
                'Error: Please contact charlie.misner@napior.com to cancel.';
            }
          },
          error: err => {
            this.cancelError =
              'Error: Please contact charlie.misner@napior.com to cancel.';
            this.cancellingStatus = 'not';
            console.log(err);
          },
          complete: () => {}
        });
    } else {
      this.cancelError = 'Please type \'cancel\' in the field above.';
    }
  }

  cancelStripeSub() {
    const data = {
      requestType: 'cancelSub',
      subscriptionId: this.rtdb.companyData.stripeSubscriptionId
    };
    const apiUrl = '/subscription_api';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(apiUrl, data, options);
  }

  cancelSubInDatabase(response) {
    const cancelResult: any = JSON.parse(response._body);
    console.log(cancelResult);
    if (cancelResult.deletedSubscription) {
      this.rtdb.companyData.plan = 'cancelled';
      this.rtdb.companyData.subscriptionFee = 0;
      // this.rtdb.companyData.stripeSubscriptionId = 'null';
      console.log(this.rtdb.companyData);
    } else {
      this.cancelError =
        'Error: Please contact charlie.misner@napior.com to cancel.';
      this.cancellingStatus = 'not';
    }
    return this.rtdb.db
      .object('/companies/' + this.rtdb.userData.companyId)
      .set(this.rtdb.companyData);
  }
}
