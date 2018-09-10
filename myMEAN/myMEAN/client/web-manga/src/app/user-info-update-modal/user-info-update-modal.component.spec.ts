import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoUpdateModalComponent } from './user-info-update-modal.component';

describe('UserInfoUpdateModalComponent', () => {
  let component: UserInfoUpdateModalComponent;
  let fixture: ComponentFixture<UserInfoUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
