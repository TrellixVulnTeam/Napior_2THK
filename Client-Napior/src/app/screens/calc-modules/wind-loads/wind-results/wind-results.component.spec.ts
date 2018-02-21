import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindResultsComponent } from './wind-results.component';

describe('WindResultsComponent', () => {
  let component: WindResultsComponent;
  let fixture: ComponentFixture<WindResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
