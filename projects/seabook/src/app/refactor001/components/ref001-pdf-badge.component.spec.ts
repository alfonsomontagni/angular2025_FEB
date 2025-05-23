import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ref001PdfBadgeComponent } from './ref001-pdf-badge.component';

describe('Ref001PdfBadgeComponent', () => {
  let component: Ref001PdfBadgeComponent;
  let fixture: ComponentFixture<Ref001PdfBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ref001PdfBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ref001PdfBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
