import { TestBed, inject } from '@angular/core/testing';

import { RollbarService } from './rollbar.service';

describe('RollbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RollbarService]
    });
  });

  it('should be created', inject([RollbarService], (service: RollbarService) => {
    expect(service).toBeTruthy();
  }));
});
