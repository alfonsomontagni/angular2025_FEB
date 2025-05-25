import { TestBed, waitForAsync } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { counterReducer } from './counter.reducer';
import { CounterEffects } from './counter.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as CounterActions from './counter.actions';


describe('CounterComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent, HttpClientTestingModule],
      providers: [
        provideStore({ counter: counterReducer }),
        provideEffects(CounterEffects)
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should increment and dispatch action', () => {
    const fixture = TestBed.createComponent(CounterComponent);
    const comp = fixture.componentInstance;
    const dispatchSpy = spyOn(comp['store'], 'dispatch').and.callThrough();

    comp.inc();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should call inc() and dispatch increment', () => {
  const fixture = TestBed.createComponent(CounterComponent);
  const comp = fixture.componentInstance;
  const dispatchSpy = spyOn(comp['store'], 'dispatch');

  comp.inc();
  expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.increment());

  comp.dec();
  expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.decrement());

  comp.reset();
  expect(dispatchSpy).toHaveBeenCalledWith(CounterActions.reset());
});

});
