import { TestBed, inject } from '@angular/core/testing';

import { TryitService } from './tryit.service';

describe('TryitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TryitService]
    });
  });

  it('should be created', inject([TryitService], (service: TryitService) => {
    expect(service).toBeTruthy();
  }));
});
