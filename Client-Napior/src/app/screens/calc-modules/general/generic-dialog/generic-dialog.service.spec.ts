import { TestBed, inject } from '@angular/core/testing';

import { GenericDialogService } from './generic-dialog.service';

describe('GenericDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericDialogService]
    });
  });

  it('should be created', inject([GenericDialogService], (service: GenericDialogService) => {
    expect(service).toBeTruthy();
  }));
});
