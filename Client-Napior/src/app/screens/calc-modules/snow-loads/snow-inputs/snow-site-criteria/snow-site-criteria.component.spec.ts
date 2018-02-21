import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowSiteCriteriaComponent } from './snow-site-criteria.component';

describe('SnowSiteCriteriaComponent', () => {
  let component: SnowSiteCriteriaComponent;
  let fixture: ComponentFixture<SnowSiteCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowSiteCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowSiteCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
