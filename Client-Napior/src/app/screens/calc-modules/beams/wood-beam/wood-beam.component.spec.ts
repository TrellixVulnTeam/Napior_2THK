import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodBeamComponent } from './wood-beams.component';

describe('WoodBeamsComponent', () => {
  let component: WoodBeamComponent;
  let fixture: ComponentFixture<WoodBeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodBeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodBeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
