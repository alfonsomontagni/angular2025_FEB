import { selectCount, selectQuote } from './counter.selectors';

describe('counter selectors', () => {
it('should select count', () => {
  const state = { counter: { count: 5, quote: '' } };
  expect(selectCount(state as any)).toBe(5); 
});


  it('should select quote', () => {
    const state = { counter: { count: 0, quote: 'ciao' } };
    expect(selectQuote(state as any)).toBe('ciao');
  });
});
