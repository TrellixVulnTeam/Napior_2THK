import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamCalculationInfoComponent } from './beam-calculation-info.component';

describe('BeamCalculationInfoComponent', () => {
  let component: BeamCalculationInfoComponent;
  let fixture: ComponentFixture<BeamCalculationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamCalculationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamCalculationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
