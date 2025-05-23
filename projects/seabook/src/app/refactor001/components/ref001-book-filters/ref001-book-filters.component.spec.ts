import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001BookFiltersComponent } from './ref001-book-filters.component';

describe('Ref001BookFiltersComponent', () => {
  let component: Ref001BookFiltersComponent;
  let fixture: ComponentFixture<Ref001BookFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001BookFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001BookFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
