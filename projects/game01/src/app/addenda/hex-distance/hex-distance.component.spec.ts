import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexDistanceComponent } from './hex-distance.component';

describe('HexDistanceComponent', () => {
  let component: HexDistanceComponent;
  let fixture: ComponentFixture<HexDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexDistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
