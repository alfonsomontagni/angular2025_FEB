import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001EditBookModalComponent } from './ref001-edit-book-modal.component';

describe('Ref001EditBookModalComponent', () => {
  let component: Ref001EditBookModalComponent;
  let fixture: ComponentFixture<Ref001EditBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001EditBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001EditBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
