import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicBuildingCriteriaComponent } from './seismic-building-criteria.component';

describe('SeismicBuildingCriteriaComponent', () => {
  let component: SeismicBuildingCriteriaComponent;
  let fixture: ComponentFixture<SeismicBuildingCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicBuildingCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicBuildingCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
