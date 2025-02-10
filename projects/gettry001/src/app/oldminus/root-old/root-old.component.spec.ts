import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootOldComponent } from './root-old.component';

describe('RootOldComponent', () => {
  let component: RootOldComponent;
  let fixture: ComponentFixture<RootOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootOldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
