import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefBookCardComponent } from './ref-book-card.component';

describe('RefBookCardComponent', () => {
  let component: RefBookCardComponent;
  let fixture: ComponentFixture<RefBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefBookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
