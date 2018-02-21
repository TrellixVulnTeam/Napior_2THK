import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindReportComponent } from './wind-report.component';

describe('WindReportComponent', () => {
  let component: WindReportComponent;
  let fixture: ComponentFixture<WindReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
