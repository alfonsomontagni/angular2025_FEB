import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001BookToolbarComponent } from './ref001-book-toolbar.component';

describe('Ref001BookToolbarComponent', () => {
  let component: Ref001BookToolbarComponent;
  let fixture: ComponentFixture<Ref001BookToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001BookToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001BookToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
