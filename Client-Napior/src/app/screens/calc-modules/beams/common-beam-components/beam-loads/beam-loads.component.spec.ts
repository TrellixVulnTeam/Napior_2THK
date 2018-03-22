import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamLoadsComponent } from './beam-loads.component';

describe('BeamLoadsComponent', () => {
  let component: BeamLoadsComponent;
  let fixture: ComponentFixture<BeamLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
