import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrivacyPolicy } from './privacy-policy';
import { TermsOfUse } from './terms-of-use';

@Component({
  selector: 'app-terms-privacy',
  templateUrl: './terms-privacy.component.html',
  styleUrls: ['./terms-privacy.component.css'],
  providers: [PrivacyPolicy, TermsOfUse]
})
export class TermsPrivacyComponent implements OnInit {

  public legal: any;
  private docIndex = {
    'privacy': this.privacy,
    'terms': this.terms
  }

  constructor(public privacy: PrivacyPolicy, public terms: TermsOfUse, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.legal = this.docIndex[this.data];
  }

}
