import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsgsSeismicComponent } from './usgs-seismic.component';

describe('UsgsSeismicComponent', () => {
  let component: UsgsSeismicComponent;
  let fixture: ComponentFixture<UsgsSeismicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsgsSeismicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsgsSeismicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
