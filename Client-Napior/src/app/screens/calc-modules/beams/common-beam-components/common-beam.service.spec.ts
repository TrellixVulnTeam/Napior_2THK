import { TestBed, inject } from '@angular/core/testing';

import { CommonBeamService } from './common-beam.service';

describe('CommonBeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonBeamService]
    });
  });

  it('should be created', inject([CommonBeamService], (service: CommonBeamService) => {
    expect(service).toBeTruthy();
  }));
});
