import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../common/auth.service';
import { RtdbService } from '../../common/rtdb.service';
import { UserInfo, UserI } from '../../common/firebase-classes';
import { Observable } from 'rxjs/Observable';
import { Plans } from '../subscription/plans'
import 'rxjs/add/operator/concatMap';
import { TermsPrivacyService } from '../../common/terms-privacy/terms-privacy.service';
import { Background } from '../../common/napior-images';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  providers: [TermsPrivacyService]
})
export class AccountSettingsComponent implements OnInit {

  public userInfo = new UserInfo(null, 'null', 'null', false, null);
  public userAndCompany: Observable<any>;
  planTitle = new Plans();
  public backgroundImageObject = new Background();
  public backgroundCSS = this.backgroundImageObject.backgroundCSSJSON;

  constructor(public authService: AuthService, public db: AngularFireDatabase, public rtdb: RtdbService, public termsPrivacy: TermsPrivacyService) {}

  ngOnInit() {
    this.rtdb.getCoAndUserData();
    
  }

}
