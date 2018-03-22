import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamLoadCombosComponent } from './beam-load-combos.component';

describe('BeamLoadCombosComponent', () => {
  let component: BeamLoadCombosComponent;
  let fixture: ComponentFixture<BeamLoadCombosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamLoadCombosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamLoadCombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
