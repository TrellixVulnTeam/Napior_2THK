import { TestBed, inject } from '@angular/core/testing';

import { MapsService } from './maps-service.service';

describe('MapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
  });

  it('should be created', inject([MapsService], (service: MapsService) => {
    expect(service).toBeTruthy();
  }));
});
