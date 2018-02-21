import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeismicGraphicsComponent } from './seismic-graphics.component';

describe('SeismicGraphicsComponent', () => {
  let component: SeismicGraphicsComponent;
  let fixture: ComponentFixture<SeismicGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeismicGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeismicGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
