import { TestBed, inject } from '@angular/core/testing';

import { SnowGraphicsService } from './snow-graphics.service';

describe('SnowGraphicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnowGraphicsService]
    });
  });

  it('should be created', inject([SnowGraphicsService], (service: SnowGraphicsService) => {
    expect(service).toBeTruthy();
  }));
});
