import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudDialogComponent } from './cloud-dialog.component';

describe('CloudDialogComponent', () => {
  let component: CloudDialogComponent;
  let fixture: ComponentFixture<CloudDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
