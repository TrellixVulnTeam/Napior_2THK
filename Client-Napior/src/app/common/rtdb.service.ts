import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { UserInfo, CompanyInfo } from './firebase-classes';
import { Observable ,  Subject, of } from 'rxjs';
import { concatMap, concat, take } from 'rxjs/operators'

@Injectable()
export class RtdbService {
  public userDbString: string;
  public companyDbString: string;
  public uid: string;
  public trialDaysLeft: number;
  public createName: string;
  public companyName: string;
  public newCompanyId: number;
  public userRef: AngularFireObject<any>;
  public companyRef: AngularFireObject<any>;
  public userConnectionRef: any;
  public userData = new UserInfo(null, 'null', 'null', false, null);
  public companyData = new CompanyInfo(
    'null',
    null,
    null,
    'null',
    'null',
    'null',
    null,
    true,
    null,
    null
  );
  public combinedData: any;
  private userDataSource = new Subject<string>();
  userData$ = this.userDataSource.asObservable();
  public amOnline: any;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase
  ) {}

  // Retrieve user data from firebase based on authenticated user id.
  getUserData(authData) {
    const userDbString = '/users/' + authData.uid;
    this.userRef = this.db.object(userDbString); //
    //this.userConnectionRef = this.db.database.refFromURL('https://napior-firebase.firebaseio.com/users/' + authData.uid);
    //this.userConnectionRef.onDisconnect().update({signedIn: false});
    const userDataObservable: Observable<any> = this.userRef.valueChanges();
    return userDataObservable;
  }

  // Retrieve company data from firebase based on user's company.
  getCompanyData(userData) {
    this.userData = userData;
    const companyDbString = '/companies/' + userData.companyId;
    this.companyRef = this.db.object(companyDbString);
    const companyDataObservable: Observable<any> = this.companyRef.valueChanges();
    return companyDataObservable;
  }

  // Concatenate observables to get user and company data.
  getCoAndUserData() {
    const userAndCompany = this.authService.user // Get authstate
      .pipe(
        concatMap(authData => this.getUserData(authData)), // Get user data
        concatMap(userData => this.getCompanyData(userData)) // Get company data
      )
    userAndCompany.subscribe({
      next: (companyData: CompanyInfo) => {
        this.companyData = companyData;
        this.trialDaysLeft = this.calculateTrial();
        this.userDataSource.next('Recieved Data');
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // Create user in rtdb using auth data.
  createUser(authData) {
    const uid = this.authService.uid;
    const userDbString = '/users/' + uid;
    const newUser = new UserInfo(
      2,
      authData.email,
      this.createName,
      false,
      Date.now()
    );
    const createCompanyObservable = this.createCompany();
    // const createUserObservable = this.db.object(userDbString).set(newUser);
    const createCompanyAndUser = createCompanyObservable.pipe(
      concatMap(
        (companyId: any): any => {
          newUser.companyId = this.newCompanyId;
          return this.db.object(userDbString).update(newUser);
        }
      )
    )
    return createCompanyAndUser;
  }

  // Create company in db.
  createCompany() {
    const companyMetaString = '_metadata/currentCompanyId';
    const createCompanyObservable = this.db
      .object(companyMetaString)
      .valueChanges()
      .pipe(
        take(1),
        concatMap((companyId: number): any => {
          this.newCompanyId = Number(companyId) + 1;
          return this.db.object(companyMetaString).set(this.newCompanyId);
        }),
        concatMap((): any => {
          const newCompany = new CompanyInfo(
            this.companyName,
            30,
            1,
            'none',
            'none',
            'trial',
            0,
            true,
            0,
            0
          );
          return this.db
            .object('/companies/' + this.newCompanyId)
            .set(newCompany);
        }),
        concat(
          Observable.create(observer => {
            observer.next(this.newCompanyId);
          })
        )
      );
      
    return createCompanyObservable;
  }

  // Sets database state of signedIn to TRUE if authenticated.
  userIsSignedIn(userData) {
    const authData: any = this.authService.userInfo;
    const userDbRoute = '/users/' + authData.uid;

    const isConnectedRoute = '/.info/connected';
    this.amOnline = this.db.object(isConnectedRoute)
      .valueChanges()
      .subscribe((data)=>{console.log(data)});

    let allowUserLogin = false;
    if (typeof authData.email !== 'undefined' && userData.signedIn === false) {
      allowUserLogin = true;
      userData.signedIn = true;
    } else {
      allowUserLogin = false;
      this.authService.userInfo = {};
    }
    const userSignedIn = Observable.create(observer => {
      this.db
        .object(userDbRoute)
        .update({ signedIn: userData.signedIn })
        .then(() => {
          observer.next(allowUserLogin);
        })
        .catch(err => {
          console.log(err);
        });
    });
    return userSignedIn;
  }

  // Sets database state of signedIn to FALSE.
  userIsSignedOut(uid) {
    const authData: any = uid;
    const userDbRoute = '/users/' + authData.uid;
    const userSignOut = this.db.object(userDbRoute)
      .update({ signedIn: false })
      .then(() => {
        console.log('Changed status to signed out.');
      })
      .catch(err => {
        console.log(err);
      })
    return userSignOut;
  }

  presenceConnection(){
    this.userConnectionRef = this.db.database.refFromURL('https://napior-firebase.firebaseio.com/users/' + this.authService.uid);
    this.userConnectionRef.onDisconnect().update({signedIn: false});
  }

  calculateTrial() {
    const msConvert = 86400000; // miliseconds per day.
    const expiryDate =
      this.userData.created + this.companyData.trialLength * msConvert;
    const now = Date.now();
    const daysLeft = Math.max(0, (expiryDate - now) / 86400000);
    return Math.round(daysLeft);
  }
}