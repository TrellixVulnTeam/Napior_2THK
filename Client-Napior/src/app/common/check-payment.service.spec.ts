import { TestBed, inject } from '@angular/core/testing';

import { CheckPaymentService } from './check-payment.service';

describe('CheckPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPaymentService]
    });
  });

  it('should be created', inject([CheckPaymentService], (service: CheckPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
