import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodBeamSectionsMaterialsComponent } from './wood-beam-sections-materials.component';

describe('WoodBeamSectionsMaterialsComponent', () => {
  let component: WoodBeamSectionsMaterialsComponent;
  let fixture: ComponentFixture<WoodBeamSectionsMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodBeamSectionsMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodBeamSectionsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
