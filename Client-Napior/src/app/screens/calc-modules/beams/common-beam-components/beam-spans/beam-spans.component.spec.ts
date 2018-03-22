import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamSpansComponent } from './beam-spans.component';

describe('BeamSpansComponent', () => {
  let component: BeamSpansComponent;
  let fixture: ComponentFixture<BeamSpansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamSpansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamSpansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
