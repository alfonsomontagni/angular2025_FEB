import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefBookToolbarComponent } from './ref-book-toolbar.component';

describe('RefBookToolbarComponent', () => {
  let component: RefBookToolbarComponent;
  let fixture: ComponentFixture<RefBookToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefBookToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefBookToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
