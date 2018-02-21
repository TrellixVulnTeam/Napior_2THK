import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowResultsComponent } from './snow-results.component';

describe('SnowResultsComponent', () => {
  let component: SnowResultsComponent;
  let fixture: ComponentFixture<SnowResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
