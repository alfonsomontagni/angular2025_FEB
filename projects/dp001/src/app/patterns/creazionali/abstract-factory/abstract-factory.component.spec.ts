import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFactoryComponent } from './abstract-factory.component';

describe('AbstractFactoryComponent', () => {
  let component: AbstractFactoryComponent;
  let fixture: ComponentFixture<AbstractFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
