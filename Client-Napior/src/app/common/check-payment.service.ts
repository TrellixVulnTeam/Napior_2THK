import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { RtdbService } from './rtdb.service';
import { UserInfo, CompanyInfo } from './firebase-classes';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Injectable()
export class CheckPaymentService {

  static trialDaysSnackBar: any;
  public blockModuleMessage: string;
  public daysInTrial: number;
  public checkingPaymentStatus = true;

  constructor(
    public authService: AuthService,
    public trialDaysSnackBar: MatSnackBar,
    public rtdb: RtdbService,
    private http: HttpClient,
  ) {}

  public checkPaymentLogin(): void {
    const userAndCompany = this.authService.user.pipe( // Get authstate
      concatMap(authData => this.rtdb.getUserData(authData)), // Get user data
      concatMap(userData => this.rtdb.getCompanyData(userData))
    );
      
    userAndCompany.subscribe({
      next: (companyData: CompanyInfo) => {
        this.rtdb.companyData = companyData;
        this.paymentStatus(companyData);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  public checkPaymentHomeInit(): void {
    this.checkingPaymentStatus = false;
  }

  private paymentStatus (companyData) {
    // Database indicates that paid is true.
    if (companyData.paid === true) {
      if (companyData.plan === 'trial') {
        this.checkTrial(companyData);
      } else if (companyData.plan === 'loads') {
        this.checkSubscription(companyData);
      } else if (companyData.plan === 'cancelled') {
        this.checkCancelled(companyData);
      }

    // If paid is false.
    } else if (companyData.paid === false) {
      if (companyData.plan === 'trial') {
        this.showTrialSnackbar();
        this.blockModuleMessage = 'Trial Has Ended';
      } else if (companyData.plan === 'loads') {
        this.blockModuleMessage = 'Subscription Has Ended';
      } else if (companyData.plan === 'cancelled') {
        this.blockModuleMessage = 'Subscription Cancelled';
      }

    }
    this.checkingPaymentStatus = false;
  }

  // Show snackbar with trial days left.
  private showTrialSnackbar(): void {
    setTimeout(() => {
      this.daysInTrial = this.rtdb.calculateTrial();
      this.trialDaysSnackBar.open(this.daysInTrial + ' Days Left in Trial', '', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }, 1000);
  }

  // Check that trial hasn't expired.
  private checkTrial(companyData) {
    this.showTrialSnackbar();
    if (this.rtdb.calculateTrial() <= 0) {
      this.rtdb.companyData.paid = false;
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/paid').set(this.rtdb.companyData.paid);
    }
  }

  // Check that subscription payments are up to date.
  private checkSubscription (companyData) {
    const now = Date.now();
    if (now > companyData.nextBill) {
      const data = {
        requestType: 'checkSub',
        customerId: companyData.stripeId
      };
      const apiUrl = '/subscription_api';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers: headers }
      return this.http.post(apiUrl, data, options).subscribe({
        next: (response: any) => {
          const customer: any = JSON.parse(response._body);
          this.delinquencyCheck(customer);
        },
        error: err => console.log(err)
      });
    }
  }

  // Update database based on subscription status.
  private delinquencyCheck(customer) {
    console.log('Checking delinquency');
    if (customer.delinquent === true) { // If delinquent, flag as unpaid.
      this.rtdb.companyData.paid = false;
      this.blockModuleMessage = 'Subscription Has Ended';
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/paid').set(this.rtdb.companyData.paid);
    } else { // If not delinquent, update new payment dates.
      this.rtdb.companyData.paid = true;
      this.rtdb.companyData.lastBilled = customer.subscriptions.data[0].current_period_start * 1000;
      this.rtdb.companyData.nextBill = customer.subscriptions.data[0].current_period_end * 1000;
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/paid').set(this.rtdb.companyData.paid);
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/lastBilled').set(this.rtdb.companyData.lastBilled);
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/nextBill').set(this.rtdb.companyData.nextBill);
    }
  }

  // If cancelled, check if end of last period.
  private checkCancelled(companyData) {
    const now = Date.now();
    if (now > companyData.nextBill) {
      this.rtdb.companyData.paid = false; // Mark as unpaid when last paid period ends.
      this.blockModuleMessage = 'Subscription Cancelled';
      this.rtdb.db.object('/companies/' + this.rtdb.userData.companyId + '/paid').set(this.rtdb.companyData.paid);
    }
  }


}
