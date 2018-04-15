import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamGraphicsComponent } from './beam-graphics.component';

describe('BeamGraphicsComponent', () => {
  let component: BeamGraphicsComponent;
  let fixture: ComponentFixture<BeamGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
