import { TestBed, inject } from '@angular/core/testing';

import { MapsServiceService } from './maps-service.service';

describe('MapsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsServiceService]
    });
  });

  it('should be created', inject([MapsServiceService], (service: MapsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
