import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtharkTreeComponent } from './uthark-tree.component';

describe('UtharkTreeComponent', () => {
  let component: UtharkTreeComponent;
  let fixture: ComponentFixture<UtharkTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtharkTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtharkTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
