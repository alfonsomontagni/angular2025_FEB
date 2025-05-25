import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as Counter from './counter.actions';
import * as Sel from './counter.selectors';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class CounterEffects {
  private actions = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);

  loadQuote$ = createEffect(() =>
    this.actions.pipe(
      ofType(Counter.increment),
      withLatestFrom(this.store.select(Sel.selectCount)),
      switchMap(([_, count]) => {
        const safeCount = Math.min(Math.max(count, 1), 100); // fallback tra 1 e 100
        return this.http
          .get<{ title: string }>(`/json-api/posts/${safeCount}`)
          .pipe(map((res) => Counter.quoteLoaded({ quote: res.title })));
      })
    )
  );
}
