import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TermsPrivacyComponent } from './terms-privacy.component';

@Injectable()
export class TermsPrivacyService {

  private dialogWidth: number;
  private dialogHeight: number;
  public copyrightYear: number;

  constructor(public dialog: MatDialog) {
    this.copyrightYear = new Date().getFullYear();
  }

  openTermsPrivacy(type){
    if (window.innerWidth < 960) {
      this.dialogWidth = 0.98 * window.innerWidth;
      this.dialogHeight = 0.95 * window.innerHeight;
    } else {
      this.dialogWidth = 0.6 * window.innerWidth;
      this.dialogHeight = 0.8 * window.innerHeight;
    }
    const dialogRef = this.dialog.open(TermsPrivacyComponent, {
      width: this.dialogWidth + 'px',
      height: this.dialogHeight + 'px',
      data: type
    });
  }

}
