import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowLoadsComponent } from './snow-loads.component';

describe('SnowLoadsComponent', () => {
  let component: SnowLoadsComponent;
  let fixture: ComponentFixture<SnowLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowLoadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
