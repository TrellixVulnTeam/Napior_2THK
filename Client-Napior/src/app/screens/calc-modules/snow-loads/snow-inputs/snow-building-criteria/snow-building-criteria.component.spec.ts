import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowBuildingCriteriaComponent } from './snow-building-criteria.component';

describe('SnowBuildingCriteriaComponent', () => {
  let component: SnowBuildingCriteriaComponent;
  let fixture: ComponentFixture<SnowBuildingCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowBuildingCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowBuildingCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
