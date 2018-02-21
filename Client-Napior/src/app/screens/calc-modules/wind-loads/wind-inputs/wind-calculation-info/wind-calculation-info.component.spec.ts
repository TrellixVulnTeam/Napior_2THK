import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindCalculationInfoComponent } from './wind-calculation-info.component';

describe('WindCalculationInfoComponent', () => {
  let component: WindCalculationInfoComponent;
  let fixture: ComponentFixture<WindCalculationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindCalculationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindCalculationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
