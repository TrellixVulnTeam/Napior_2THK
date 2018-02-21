import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsResultsContainerComponent } from './graphics-results-container.component';

describe('GraphicsResultsContainerComponent', () => {
  let component: GraphicsResultsContainerComponent;
  let fixture: ComponentFixture<GraphicsResultsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsResultsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
