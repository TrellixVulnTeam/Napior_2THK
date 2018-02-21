import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicReportComponent } from './seismic-report.component';

describe('SeismicReportComponent', () => {
  let component: SeismicReportComponent;
  let fixture: ComponentFixture<SeismicReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
