import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsControlsComponent } from './graphics-controls.component';

describe('GraphicsControlsComponent', () => {
  let component: GraphicsControlsComponent;
  let fixture: ComponentFixture<GraphicsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
