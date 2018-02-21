import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindLoadsComponent } from './wind-loads.component';

describe('WindLoadsComponent', () => {
  let component: WindLoadsComponent;
  let fixture: ComponentFixture<WindLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
