import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001BookCardComponent } from './ref001-book-card.component';

describe('Ref001BookCardComponent', () => {
  let component: Ref001BookCardComponent;
  let fixture: ComponentFixture<Ref001BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001BookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
