import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefBookFiltersComponent } from './ref-book-filters.component';

describe('RefBookFiltersComponent', () => {
  let component: RefBookFiltersComponent;
  let fixture: ComponentFixture<RefBookFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefBookFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefBookFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
