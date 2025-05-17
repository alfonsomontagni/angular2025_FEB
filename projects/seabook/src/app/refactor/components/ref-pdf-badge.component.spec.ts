import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefPdfBadgeComponent } from './ref-pdf-badge.component';

describe('RefPdfBadgeComponent', () => {
  let component: RefPdfBadgeComponent;
  let fixture: ComponentFixture<RefPdfBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefPdfBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefPdfBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
