import { TestBed, inject } from '@angular/core/testing';

import { WindGraphicsService } from './wind-graphics.service';

describe('WindGraphicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindGraphicsService]
    });
  });

  it('should be created', inject([WindGraphicsService], (service: WindGraphicsService) => {
    expect(service).toBeTruthy();
  }));
});
