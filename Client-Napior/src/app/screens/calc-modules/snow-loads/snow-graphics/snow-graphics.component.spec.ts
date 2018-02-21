import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowGraphicsComponent } from './snow-graphics.component';

describe('SnowGraphicsComponent', () => {
  let component: SnowGraphicsComponent;
  let fixture: ComponentFixture<SnowGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
