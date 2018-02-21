import { TestBed, inject } from '@angular/core/testing';

import { RunCalcService } from './run-calc.service';

describe('RunCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunCalcService]
    });
  });

  it('should be created', inject([RunCalcService], (service: RunCalcService) => {
    expect(service).toBeTruthy();
  }));
});
