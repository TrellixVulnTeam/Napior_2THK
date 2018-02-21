import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicCalculationInfoComponent } from './seismic-calculation-info.component';

describe('SeismicCalculationInfoComponent', () => {
  let component: SeismicCalculationInfoComponent;
  let fixture: ComponentFixture<SeismicCalculationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicCalculationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicCalculationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
