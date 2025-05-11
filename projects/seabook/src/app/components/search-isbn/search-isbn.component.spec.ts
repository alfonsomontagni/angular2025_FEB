import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIsbnComponent } from './search-isbn.component';

describe('SearchIsbnComponent', () => {
  let component: SearchIsbnComponent;
  let fixture: ComponentFixture<SearchIsbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchIsbnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
