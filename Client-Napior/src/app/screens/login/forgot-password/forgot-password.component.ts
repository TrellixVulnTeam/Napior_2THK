import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  loginError: string = " ";
  emailState: string = 'unsent';
  sending: boolean = false;
  errorMessages: {} = {
    'auth/argument-error': 'Please provide a valid email.',
    'auth/invalid-email': 'Email is incorrectly formatted.',
    'auth/user-not-found': 'Email address not found.'
  }

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseAuth: AngularFireAuth
  ) { }

  sendPasswordReset(): void {
    this.sending = true;
    this.firebaseAuth
      .auth
      .sendPasswordResetEmail(this.email).then(() => {
        console.log("Reset email sent.");
        this.loginError = " ";
        this.emailState = 'sent';
        this.sending = false;
        //this.dialogRef.close();
      }).catch((error: any) => {
        console.log(error.message);
        this.sending = false;
        this.loginError = this.errorMessages[error.code];
      });
  }

  ngOnInit() {
  }

}
