import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPvcComponent } from './user-list-pvc.component';

describe('UserListPvcComponent', () => {
  let component: UserListPvcComponent;
  let fixture: ComponentFixture<UserListPvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPvcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListPvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
