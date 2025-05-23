import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefBookListComponent } from './ref-book-list.component';

describe('RefBookListComponent', () => {
  let component: RefBookListComponent;
  let fixture: ComponentFixture<RefBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefBookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
