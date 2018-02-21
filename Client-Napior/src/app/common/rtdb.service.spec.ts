import { TestBed, inject } from '@angular/core/testing';

import { RtdbService } from './rtdb.service';

describe('RtdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RtdbService]
    });
  });

  it('should be created', inject([RtdbService], (service: RtdbService) => {
    expect(service).toBeTruthy();
  }));
});
