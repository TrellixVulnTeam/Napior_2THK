import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindBuildingCriteriaComponent } from './wind-building-criteria.component';

describe('WindBuildingCriteriaComponent', () => {
  let component: WindBuildingCriteriaComponent;
  let fixture: ComponentFixture<WindBuildingCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindBuildingCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindBuildingCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
