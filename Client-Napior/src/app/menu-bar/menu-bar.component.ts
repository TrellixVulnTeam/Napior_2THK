import { Component, OnInit, DoCheck, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { RtdbService } from '../common/rtdb.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import { TryitService } from '../screens/splash/tryit.service';
import { NavigationCancel, NavigationStart, ResolveEnd } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginCardsService } from '../screens/login/login-cards.service';
import { NapiorLogoWhiteGreen } from '../common/napior-images';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class MenuBarComponent implements OnInit {

  public napiorLogoObject = new NapiorLogoWhiteGreen();
  public napiorLogoString = this.napiorLogoObject.imageElement;

  public authAgainst = 'napior-firebase.firebaseapp.com';
  public controlButtonConfig: {} = {
    '': {
      'homeButton': false,
      'signInButton': true,
      'signOutButton': false,
      'accountButton': false,
      'blogButton': true,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': true,
      'logoRoute': '/splash',
      'pageTitle': ''
    },
    '/': {
      'homeButton': false,
      'signInButton': true,
      'signOutButton': false,
      'accountButton': false,
      'blogButton': true,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': true,
      'logoRoute': '/splash',
      'pageTitle': '| Structural Software'
    },
    '/splash': {
      'homeButton': false,
      'signInButton': true,
      'signOutButton': false,
      'accountButton': false,
      'blogButton': true,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': true,
      'logoRoute': '/splash',
      'pageTitle': '| Structural Software'
    },
    '/login': {
      'homeButton': false,
      'signInButton': false,
      'signOutButton': false,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/splash',
      'pageTitle': '| Structural Software'
    },
    '/create-account': {
      'homeButton': false,
      'signInButton': false,
      'signOutButton': false,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/splash',
      'pageTitle': ''
    },
    '/home': {
      'homeButton': false,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': true,
      'blogButton': true,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Home'
    },
    '/account-settings': {
      'homeButton': true,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Account Settings'
    },
    '/subscription': {
      'homeButton': true,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Subscription'
    },
    '/seismic-loads': {
      'homeButton': true,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Seismic Load Calculation'
    },
    '/wind-loads': {
      'homeButton': true,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Wind Load Calculation'
    },
    '/snow-loads': {
      'homeButton': true,
      'signInButton': false,
      'signOutButton': true,
      'accountButton': false,
      'blogButton': false,
      'aboutButton': false,
      'pricingButton': false,
      'featuresButton': false,
      'tryItButton': false,
      'logoRoute': '/home',
      'pageTitle': '| Snow Load Calculation'
    },
  };
  public activeButtonConfig = {
    'homeButton': false,
    'signInButton': false,
    'signOutButton': false,
    'accountButton': false,
    'blogButton': false,
    'aboutButton': false,
    'pricingButton': false,
    'featuresButton': false,
    'tryItButton': false,
    'logoRoute': '',
    'pageTitle': ''
  };

  constructor(
    public authService: AuthService,
    public ref: ChangeDetectorRef,
    public router: Router,
    public rtdb: RtdbService,
    public tryit: TryitService,
    public login: LoginCardsService
  ) {

  }

  public activeButtonObservable = new Observable((observer) => {
    const url = this.controlButtonConfig[this.router.url];
    observer.next(url);
  });

  @HostListener('window:beforeunload', ['$event']) closeWindow($event) {
    console.log('Window Closed');
    if(environment.production){
      this.signOut(); //Uncomment for deploy.
    }
  }

  signOut() {
    const authData: any = this.authService.userInfo;
    this.authService.userInfo = {};
    // this.rtdb.userIsSignedOut(authData.uid);
    const signOut = this.rtdb.userIsSignedOut(authData);
    const logOut = this.authService.logout();
    signOut.concat(logOut);
    signOut.subscribe(
      // tslint:disable-next-line:no-unused-expression
      () => { this.router.navigate['/login']; }
    );
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.router.events.subscribe(  // When url changes, buttons in menu-bar display based on url.
      (value: any) => {
        if (typeof value.url !== 'undefined' && value instanceof ResolveEnd ) {
          this.activeButtonConfig = this.controlButtonConfig[value.url];
          if (this.activeButtonConfig == null){
            this.activeButtonConfig = this.controlButtonConfig[''];
          }
          this.ref.detectChanges();
        }
      }
    );
    this.authService.user.take(1).subscribe({
      next: (userInfo) => {this.authService.userInfo = userInfo; }
    });
  }

}
