import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

const selectCounter = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(selectCounter, s => s.count);
export const selectQuote = createSelector(selectCounter, s => s.quote);
