import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindGraphicsComponent } from './wind-graphics.component';

describe('WindGraphicsComponent', () => {
  let component: WindGraphicsComponent;
  let fixture: ComponentFixture<WindGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
