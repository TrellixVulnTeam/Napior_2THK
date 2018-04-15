import { TestBed, inject } from '@angular/core/testing';

import { BeamGraphicsService } from './beam-graphics.service';

describe('BeamGraphicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeamGraphicsService]
    });
  });

  it('should be created', inject([BeamGraphicsService], (service: BeamGraphicsService) => {
    expect(service).toBeTruthy();
  }));
});
