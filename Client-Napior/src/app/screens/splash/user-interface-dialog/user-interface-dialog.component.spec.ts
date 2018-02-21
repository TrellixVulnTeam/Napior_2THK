import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterfaceDialogComponent } from './user-interface-dialog.component';

describe('UserInterfaceDialogComponent', () => {
  let component: UserInterfaceDialogComponent;
  let fixture: ComponentFixture<UserInterfaceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInterfaceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInterfaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
