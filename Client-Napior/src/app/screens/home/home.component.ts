import { Component, OnInit } from '@angular/core';
import { RtdbService } from '../../common/rtdb.service';
import { CheckPaymentService } from '../../common/check-payment.service';
import { TermsPrivacyService } from '../../common/terms-privacy/terms-privacy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TermsPrivacyService]
})
export class HomeComponent implements OnInit {

  moduleUnavailable = false;

  constructor(public rtdb: RtdbService, public checkPayment: CheckPaymentService, public termsPrivacy: TermsPrivacyService) { }

  ngOnInit() {
    this.checkPayment.checkPaymentHomeInit();
  }

}
