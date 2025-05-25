import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CounterEffects } from './counter.effects';
import * as CounterActions from './counter.actions';
import * as CounterSelectors from './counter.selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Action } from '@ngrx/store';

describe('CounterEffects', () => {
  let actions$: Observable<Action>;
  let effects: CounterEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CounterEffects,
        provideMockActions(() => actions$),
        provideMockStore({
        selectors: [
            {
            selector: CounterSelectors.selectCount,
            value: 5
            }
          ]
        })
      ]
    });

    effects = TestBed.inject(CounterEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should call API and dispatch quoteLoaded', (done) => {
    actions$ = of(CounterActions.increment());

    effects.loadQuote$.subscribe((result) => {
      expect(result).toEqual(CounterActions.quoteLoaded({ quote: 'Titolo mockato' }));
      done();
    });

    const req = httpMock.expectOne('/json-api/posts/5');
    expect(req.request.method).toBe('GET');
    req.flush({ title: 'Titolo mockato' });
  });
});
