import { TestBed, inject } from '@angular/core/testing';

import { TermsPrivacyService } from './terms-privacy.service';

describe('TermsPrivacyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermsPrivacyService]
    });
  });

  it('should be created', inject([TermsPrivacyService], (service: TermsPrivacyService) => {
    expect(service).toBeTruthy();
  }));
});
