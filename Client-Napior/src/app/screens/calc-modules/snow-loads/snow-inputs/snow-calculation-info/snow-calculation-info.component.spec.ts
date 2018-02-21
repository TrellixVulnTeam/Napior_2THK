import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowCalculationInfoComponent } from './snow-calculation-info.component';

describe('SnowCalculationInfoComponent', () => {
  let component: SnowCalculationInfoComponent;
  let fixture: ComponentFixture<SnowCalculationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowCalculationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowCalculationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
