import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSqlComponent } from './user-list-sql.component';

describe('UserListSqlComponent', () => {
  let component: UserListSqlComponent;
  let fixture: ComponentFixture<UserListSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListSqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
