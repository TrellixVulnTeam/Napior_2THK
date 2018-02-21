import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  uid: string;
  user: Observable<firebase.User>;
  userInfo: any ;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.userInfo = {};
  }

  signup(email: string, password: string) {
    let createAccountObservable = new Observable((observer)=>{
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Created Account.');
        this.userInfo = value;
        this.uid = this.userInfo.uid;
        observer.next(value);
      })
      .catch(err => {
        console.log('There was an error creating the account.');
        observer.next(err);
      });
    });
    return createAccountObservable;
  }

  //Returns observable that authenticates the user on firebase.
  login(email: string, password: string) {
    let logOutObservable = new Observable((observer)=>{
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.userInfo = value;
        this.uid = this.userInfo.uid;
        observer.next(value);
      })
      .catch(err => {
        observer.next(err);
      });
    });
    return logOutObservable;
  }

  //Sets the user to not authenticated on firebase.
  logout() {
    const logOutObservable = Observable.of(
      this.firebaseAuth
      .auth
      .signOut()
      .then(()=>{this.userInfo = {}})
    )
    return logOutObservable;
  }

}
