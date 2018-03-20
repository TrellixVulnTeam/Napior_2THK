import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WoodBeamResultsComponent } from './wood-beam-results.component';

describe('WoodBeamResultsComponent', () => {
  let component: WoodBeamResultsComponent;
  let fixture: ComponentFixture<WoodBeamResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WoodBeamResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WoodBeamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
