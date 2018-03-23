import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodBeamSectionSettingsComponent } from './wood-beam-section-settings.component';

describe('WoodBeamSectionSettingsComponent', () => {
  let component: WoodBeamSectionSettingsComponent;
  let fixture: ComponentFixture<WoodBeamSectionSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodBeamSectionSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodBeamSectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
