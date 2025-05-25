import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001BookListComponent } from './ref001-book-list.component';

describe('Ref001BookListComponent', () => {
  let component: Ref001BookListComponent;
  let fixture: ComponentFixture<Ref001BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001BookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
