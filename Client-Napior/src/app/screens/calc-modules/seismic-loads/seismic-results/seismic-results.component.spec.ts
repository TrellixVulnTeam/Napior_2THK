import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicResultsComponent } from './seismic-results.component';

describe('SeismicResultsComponent', () => {
  let component: SeismicResultsComponent;
  let fixture: ComponentFixture<SeismicResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
