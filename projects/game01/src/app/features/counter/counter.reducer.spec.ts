import { counterReducer, initialState, CounterState } from './counter.reducer';
import * as CounterActions from './counter.actions';

describe('counterReducer', () => {
  it('should increment the count', () => {
    const result = counterReducer(initialState, CounterActions.increment());
    expect(result.count).toBe(1);
  });

  it('should decrement the count', () => {
    const prevState: CounterState = { count: 3 };
    const result = counterReducer(prevState, CounterActions.decrement());
    expect(result.count).toBe(2);
  });

  it('should reset the count to 0', () => {
    const prevState: CounterState = { count: 10 };
    const result = counterReducer(prevState, CounterActions.reset());
    expect(result.count).toBe(0);
  });

  it('should load a quote', () => {
    const result = counterReducer(initialState, CounterActions.quoteLoaded({ quote: 'Test quote' }));
    expect(result.quote).toBe('Test quote');
  });
});
