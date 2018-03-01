import { Component, OnInit } from '@angular/core';
import { SplashStylesService } from './splash-styles.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CloudDialogComponent } from './cloud-dialog/cloud-dialog.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { UserInterfaceDialogComponent } from './user-interface-dialog/user-interface-dialog.component';
import { TryitService } from './tryit.service'
import { TermsPrivacyService } from '../../common/terms-privacy/terms-privacy.service';
import { SeismicModuleLogo, Background } from '../../common/napior-images';
import { LoginCardsService } from '../login/login-cards.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
  providers: [
    SplashStylesService,
    TermsPrivacyService
  ]
})
export class SplashComponent implements OnInit {

  private dialogWidth: number;
  private dialogHeight: number;
  public backgroundImageObject = new Background();
  public backgroundCSS = this.backgroundImageObject.backgroundCSSJSONTop;

  constructor(
    public splashStyles: SplashStylesService, 
    public dialog: MatDialog,
    public termsPrivacy: TermsPrivacyService,
    public tryit: TryitService,
    public loginCard: LoginCardsService
  ) { }

  openUserInterfaceDialog(): void {
    const dialogRef = this.dialog.open(UserInterfaceDialogComponent, {
    });
  }

  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: this.dialogWidth + 'px',
      height: this.dialogHeight + 'px'
    });
  }

  openCloudDialog(): void {
    const dialogRef = this.dialog.open(CloudDialogComponent, {
      width: '300px',
      height: '460px'
    });
  }

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.dialogWidth = 0.98 * window.innerWidth;
      this.dialogHeight = 0.95 * window.innerHeight;
    } else {
      this.dialogWidth = 0.6 * window.innerWidth;
      this.dialogHeight = 0.8 * window.innerHeight;
    }
  }

}
