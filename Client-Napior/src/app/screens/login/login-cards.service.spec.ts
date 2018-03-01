import { TestBed, inject } from '@angular/core/testing';

import { LoginCardsService } from './login-cards.service';

describe('LoginCardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginCardsService]
    });
  });

  it('should be created', inject([LoginCardsService], (service: LoginCardsService) => {
    expect(service).toBeTruthy();
  }));
});
