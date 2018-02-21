import { TestBed, inject } from '@angular/core/testing';

import { WindGraphicsControlsService } from './wind-graphics-controls.service';

describe('WindGraphicsControlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindGraphicsControlsService]
    });
  });

  it('should be created', inject([WindGraphicsControlsService], (service: WindGraphicsControlsService) => {
    expect(service).toBeTruthy();
  }));
});
