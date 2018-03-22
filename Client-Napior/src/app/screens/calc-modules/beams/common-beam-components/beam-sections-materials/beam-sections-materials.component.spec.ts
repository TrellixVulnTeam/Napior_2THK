import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamSectionsMaterialsComponent } from './beam-sections-materials.component';

describe('BeamSectionsMaterialsComponent', () => {
  let component: BeamSectionsMaterialsComponent;
  let fixture: ComponentFixture<BeamSectionsMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamSectionsMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamSectionsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
