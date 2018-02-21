import { TestBed, inject } from '@angular/core/testing';

import { SplashStylesService } from './splash-styles.service';

describe('SplashStylesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplashStylesService]
    });
  });

  it('should be created', inject([SplashStylesService], (service: SplashStylesService) => {
    expect(service).toBeTruthy();
  }));
});
