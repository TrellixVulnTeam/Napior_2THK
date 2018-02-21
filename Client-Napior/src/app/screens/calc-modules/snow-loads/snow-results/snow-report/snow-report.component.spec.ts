import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowReportComponent } from './snow-report.component';

describe('SnowReportComponent', () => {
  let component: SnowReportComponent;
  let fixture: ComponentFixture<SnowReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
