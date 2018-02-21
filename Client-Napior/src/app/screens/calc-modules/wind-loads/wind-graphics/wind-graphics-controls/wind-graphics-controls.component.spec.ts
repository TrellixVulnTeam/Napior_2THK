import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGraphicsControlsComponent } from './wind-graphics-controls.component';

describe('WindGraphicsControlsComponent', () => {
  let component: WindGraphicsControlsComponent;
  let fixture: ComponentFixture<WindGraphicsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindGraphicsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindGraphicsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
