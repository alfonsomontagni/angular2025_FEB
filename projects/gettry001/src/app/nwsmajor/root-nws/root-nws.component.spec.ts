import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootNwsComponent } from './root-nws.component';

describe('RootNwsComponent', () => {
  let component: RootNwsComponent;
  let fixture: ComponentFixture<RootNwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootNwsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RootNwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
