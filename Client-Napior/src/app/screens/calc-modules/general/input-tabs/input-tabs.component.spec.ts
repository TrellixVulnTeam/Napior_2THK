import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTabsComponent } from './input-tabs.component';

describe('InputTabsComponent', () => {
  let component: InputTabsComponent;
  let fixture: ComponentFixture<InputTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
