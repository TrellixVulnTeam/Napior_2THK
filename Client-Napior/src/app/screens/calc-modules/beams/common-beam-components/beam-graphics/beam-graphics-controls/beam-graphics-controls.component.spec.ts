import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamGraphicsControlsComponent } from './beam-graphics-controls.component';

describe('BeamGraphicsControlsComponent', () => {
  let component: BeamGraphicsControlsComponent;
  let fixture: ComponentFixture<BeamGraphicsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamGraphicsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamGraphicsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
