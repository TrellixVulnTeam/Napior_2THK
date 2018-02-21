import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindSiteCriteriaComponent } from './wind-site-criteria.component';

describe('WindSiteCriteriaComponent', () => {
  let component: WindSiteCriteriaComponent;
  let fixture: ComponentFixture<WindSiteCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindSiteCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindSiteCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
