import { TestBed, inject } from '@angular/core/testing';

import { WoodBeamService } from './wood-beam.service';

describe('WoodBeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WoodBeamService]
    });
  });

  it('should be created', inject([WoodBeamService], (service: WoodBeamService) => {
    expect(service).toBeTruthy();
  }));
});
