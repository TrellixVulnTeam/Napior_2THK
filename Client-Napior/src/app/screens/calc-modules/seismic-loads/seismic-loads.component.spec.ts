import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicLoadsComponent } from './seismic-loads.component';

describe('SeismicLoadsComponent', () => {
  let component: SeismicLoadsComponent;
  let fixture: ComponentFixture<SeismicLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
