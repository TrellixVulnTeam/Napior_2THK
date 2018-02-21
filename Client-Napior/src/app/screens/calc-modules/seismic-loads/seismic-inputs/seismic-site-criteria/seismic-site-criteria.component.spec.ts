import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicSiteCriteriaComponent } from './seismic-site-criteria.component';

describe('SeismicSiteCriteriaComponent', () => {
  let component: SeismicSiteCriteriaComponent;
  let fixture: ComponentFixture<SeismicSiteCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicSiteCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicSiteCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
