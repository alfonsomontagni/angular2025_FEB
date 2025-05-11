import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSignalsComponent } from './navbar-signals.component';

describe('NavbarSignalsComponent', () => {
  let component: NavbarSignalsComponent;
  let fixture: ComponentFixture<NavbarSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
