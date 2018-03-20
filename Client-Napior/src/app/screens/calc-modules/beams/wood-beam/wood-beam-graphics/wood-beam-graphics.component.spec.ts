import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodBeamGraphicsComponent } from './wood-beam-graphics.component';

describe('WoodBeamGraphicsComponent', () => {
  let component: WoodBeamGraphicsComponent;
  let fixture: ComponentFixture<WoodBeamGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodBeamGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodBeamGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
