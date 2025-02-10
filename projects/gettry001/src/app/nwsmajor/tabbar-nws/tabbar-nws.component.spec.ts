import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbarNwsComponent } from './tabbar-nws.component';

describe('TabbarNwsComponent', () => {
  let component: TabbarNwsComponent;
  let fixture: ComponentFixture<TabbarNwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbarNwsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabbarNwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
