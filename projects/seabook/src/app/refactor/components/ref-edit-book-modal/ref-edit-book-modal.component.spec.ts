import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefEditBookModalComponent } from './ref-edit-book-modal.component';

describe('RefEditBookModalComponent', () => {
  let component: RefEditBookModalComponent;
  let fixture: ComponentFixture<RefEditBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefEditBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefEditBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
