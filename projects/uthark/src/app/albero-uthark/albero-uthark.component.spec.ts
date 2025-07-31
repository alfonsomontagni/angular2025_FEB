import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlberoUtharkComponent } from './albero-uthark.component';

describe('AlberoUtharkComponent', () => {
  let component: AlberoUtharkComponent;
  let fixture: ComponentFixture<AlberoUtharkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlberoUtharkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlberoUtharkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
