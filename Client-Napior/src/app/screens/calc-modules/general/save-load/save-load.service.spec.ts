import { TestBed, inject } from '@angular/core/testing';

import { SaveLoadService } from './save-load.service';

describe('SaveLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveLoadService]
    });
  });

  it('should be created', inject([SaveLoadService], (service: SaveLoadService) => {
    expect(service).toBeTruthy();
  }));
});
