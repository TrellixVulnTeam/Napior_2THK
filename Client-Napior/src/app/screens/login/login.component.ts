import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../common/auth.service';
import { RtdbService } from '../../common/rtdb.service';
import { CheckPaymentService } from '../../common/check-payment.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concat';
import { MatDialog } from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TryitService } from '../splash/tryit.service';
import { TermsPrivacyService } from '../../common/terms-privacy/terms-privacy.service';
import { Background, NapiorLogoColor } from '../../common/napior-images';
import { LoginCardsService } from './login-cards.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TermsPrivacyService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  loginError = '';
  loggingIn = false;
  passwordsMatch = true;
  agreeToTerms = false;
  public backgroundImageObject = new Background();
  public backgroundCSS = this.backgroundImageObject.backgroundCSSJSONTop;
  public napiorLogoObject = new NapiorLogoColor();
  public napiorLogoString = this.napiorLogoObject.imageElement;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ref: ChangeDetectorRef,
    public dialog: MatDialog,
    public rtdb: RtdbService,
    public checkPaymentService: CheckPaymentService,
    public tryit: TryitService,
    public termsPrivacy: TermsPrivacyService,
    public loginCard: LoginCardsService
  ) {}

  // Attempts to log user in given email and password.
  login() {
    this.loginError = '';
    this.loggingIn = true;
    try {
      const authInfo = this.authService
        .login(this.email, this.password) // Authenticate.
        .concatMap(authData => this.rtdb.getUserData(authData)) // Get userdata.
        .concatMap((userData): any => this.rtdb.userIsSignedIn(userData)); // Check if user is already signed in.
      authInfo.subscribe({
        next: signInUser => {
          console.log(signInUser);
          if (signInUser === true) {
            // If all auth and sign in conditions are met, then route to home.
            this.rtdb.presenceConnection();
            this.router.navigate(['/home']);
            this.checkPaymentService.checkPaymentLogin();
          } else {
            this.loginError = 'Someone is using this login.';
          }
          this.loggingIn = false;
        },
        error: err => {
          console.log(err);
          if (this.loginError === ''){
            this.loginError = 'Please enter a valid email and password.';
          };
          this.loggingIn = false;
          this.authService.userInfo = {};
        }
      });
    } catch (exception) {
      // tslint:disable-next-line:one-line
      console.log(exception);
      if (this.loginError === ''){
        this.loginError = 'Please enter a valid email and password.';
      };
      this.authService.userInfo = {};
      this.loggingIn = false;
    }
  }

  // Creates user account in AuthDB and RealTimeDB.
  createAccount() {
    this.loggingIn = true;
    if (this.agreeToTerms === true) {
      try {
        const createAccount = this.authService
          .signup(this.email, this.password)
          .concatMap((authData): any => this.rtdb.createUser(authData));
        createAccount.subscribe({
          next: userData => {
            this.login();
          },
          error: err => {
            this.loginError = 'There was an error creating the account.';
            this.loggingIn = false;
            console.log(err);
          }
        });
      } catch (exception) {
        // tslint:disable-next-line:one-line
        this.loginError = 'There was an error creating the account.';
        this.loggingIn = false;
      }
    } else {
      this.loginError = 'You must agree to the terms of service.';
      this.loggingIn = false;
    }
  }

  confirmPass() {
    if (this.password !== this.confirmPassword) {
      this.loginError = "Passwords don't match.";
      this.passwordsMatch = false;
    } else {
      this.loginError = '';
      this.passwordsMatch = true;
    }
  }

  selectCreateAccountCard() {
    this.loginCard.createAccountCard();
    this.loginError = '';
    this.password = '';
  }

  selectLoginCard() {
    this.loginCard.loginCard();
    this.loginError = '';
    this.password = '';
    this.confirmPassword = '';
  }

  openForgotPassDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      height: '340px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    
  }
}