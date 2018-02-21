import { TestBed, inject } from '@angular/core/testing';

import { SeismicGraphicsService } from './seismic-graphics.service';

describe('SeismicGraphicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeismicGraphicsService]
    });
  });

  it('should be created', inject([SeismicGraphicsService], (service: SeismicGraphicsService) => {
    expect(service).toBeTruthy();
  }));
});
