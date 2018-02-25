import { Component, OnInit } from '@angular/core';
import { RtdbService } from '../../common/rtdb.service';
import { CheckPaymentService } from '../../common/check-payment.service';
import { TermsPrivacyService } from '../../common/terms-privacy/terms-privacy.service';
import { SeismicModuleLogo, Background } from '../../common/napior-images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TermsPrivacyService]
})
export class HomeComponent implements OnInit {

  moduleUnavailable = false;
  public seismicImageObject = new SeismicModuleLogo();
  public seismicImageString = this.seismicImageObject.imageElement;

  constructor(public rtdb: RtdbService, public checkPayment: CheckPaymentService, public termsPrivacy: TermsPrivacyService) {
    console.log(this.seismicImageString);
  }

  ngOnInit() {
    this.checkPayment.checkPaymentHomeInit();
  }

}
