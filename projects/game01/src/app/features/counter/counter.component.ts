import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as Counter from './counter.actions';
import * as Sel from './counter.selectors';
import { HexDistanceComponent } from '../../addenda/hex-distance/hex-distance.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule,HexDistanceComponent],
  template: `
  <br>
  <div>
    <app-hex-distance></app-hex-distance>
  </div>
    <div class="mx-auto mt-10 max-w-sm rounded-2xl border p-6 shadow">
      <h1 class="mb-4 text-center text-3xl font-semibold">
        Contatore: <span class="text-emerald-600">{{ count$ | async }}</span>
      </h1>

      <div class="flex items-center justify-center gap-4">
        <button class="btn" (click)="dec()">−</button>
        <button class="btn" (click)="inc()">＋</button>
        <button class="btn" (click)="reset()">↺</button>
      </div>

      <p class="mt-6 italic text-slate-600" *ngIf="quote$ | async as q">
        «{{ q }}»
      </p>
    </div>
  `,
  styles: [`
    .btn {
      @apply rounded-lg bg-emerald-500 px-4 py-2 text-white shadow
             transition hover:bg-emerald-600 active:scale-95;
    }
  `]
})
export class CounterComponent {
  private store = inject(Store);

  count$ = this.store.select(Sel.selectCount);
  quote$ = this.store.select(Sel.selectQuote);

  inc()   { this.store.dispatch(Counter.increment()); }
  dec()   { this.store.dispatch(Counter.decrement()); }
  reset() { this.store.dispatch(Counter.reset()); }
}
