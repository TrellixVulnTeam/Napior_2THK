import { Injectable } from '@angular/core';
import { StripeService, StripeJS} from "ngx-stripe";

@Injectable()
export class SubscriptionService {

  private key: string = 'pk_test_iXGCqTFvZg5hYOXU5qoDqn1A';
  private stripe: StripeJS;

  constructor(stripeService: StripeService, ) {

   }

  public updatePlan(email, ccNumber, expMonth, expYear, cvc){
    console.log('Subscribe');
    /*this.stripe.card.createToken({
      number: ccNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        console.log(`Success! Card token ${response.card.id}.`);
      } else {
        console.log(response.error.message);
      }
    });*/
  }

}
