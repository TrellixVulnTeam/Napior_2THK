import { TestBed, inject } from '@angular/core/testing';

import { InputTabsService } from './input-tabs.service';

describe('InputTabsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputTabsService]
    });
  });

  it('should be created', inject([InputTabsService], (service: InputTabsService) => {
    expect(service).toBeTruthy();
  }));
});
