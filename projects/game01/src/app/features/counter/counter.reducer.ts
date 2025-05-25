import { createReducer, on } from '@ngrx/store';
import * as Counter from './counter.actions';

export interface CounterState {
  count: number;
  quote?: string;
}

export const initialState: CounterState = { count: 0 };

export const counterReducer = createReducer(
  initialState,
  on(Counter.increment,   s => ({ ...s, count: s.count + 1 })),
  on(Counter.decrement,   s => ({ ...s, count: s.count - 1 })),
  on(Counter.reset,       s => ({ ...s, count: 0 })),
  on(Counter.quoteLoaded, (s, { quote }) => ({ ...s, quote }))
);
