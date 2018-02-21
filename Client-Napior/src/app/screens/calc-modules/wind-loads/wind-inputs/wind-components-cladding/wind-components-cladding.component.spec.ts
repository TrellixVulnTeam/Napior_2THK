import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindComponentsCladdingComponent } from './wind-components-cladding.component';

describe('WindComponentsCladdingComponent', () => {
  let component: WindComponentsCladdingComponent;
  let fixture: ComponentFixture<WindComponentsCladdingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindComponentsCladdingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindComponentsCladdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
