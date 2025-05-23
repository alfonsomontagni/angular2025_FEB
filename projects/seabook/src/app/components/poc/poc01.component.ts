import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { mySignal } from './my-signal';
@Component({
  selector: 'app-poc01',
  imports: [CommonModule,FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
  <div class="container mx-auto px-4 py-8 max-w-5xl">
     <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">POC 01</h1>
        <p class="text-gray-600">te4st</p>
      </header>
   <input type="text" [value]="searchValue" (keyup)="searchValueChange($event)" />

<input type="text" [(ngModel)]="searchValue" />
<input
  type="text"
  [ngModel]="searchValue"
  (ngModelChange)="modelValueChange($event)"
/>
{{ searchValue }}

<br />

<form (ngSubmit)="onSearchFormSubmit()" #searchTplForm="ngForm">
  <input type="text" [(ngModel)]="searchForm.searchValue" name="searchValue" />
  <button type="submit" [disabled]="!searchTplForm.valid">Submit</button>
</form>
<br>
<h1>
    First Signal: {{firstSignal()}}
</h1>
<h1>
    Second Signal: {{secondSignal()}}
</h1>
<h1>
    Derived Signal: {{derived()}}
</h1>

<hr>
 <div class="flex flex-wrap gap-3 mb-6 items-center">
<p>
<button (click)="setSignal()">Set first signal to 10</button>
</p>
<p>
<button (click)="updateSignal()">Increment first signal</button>
</p>
 </div>
  </div>
  `,
  styles: ``
})
export class Poc01Component {
searchValue = 'Initial value';
  searchForm = {
    searchValue: 'Initial value',
  };

  modelValueChange(value: string) {
    this.searchValue = value;
  }

  searchValueChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue = value;
  }

  onSearchFormSubmit(): void {
    console.log('onSearchFormSubmit', this.searchForm);
  }

   readonly firstSignal = signal(42);

  readonly secondSignal = signal('Signals');

  readonly thirdSignal = signal(10);

  readonly derived = computed(() => this.firstSignal() + this.thirdSignal());


  setSignal() {
    this.firstSignal.set(10);
    this.firstSignal.update(value => value + 1);
    this.secondSignal.set('Hello');
  }

  updateSignal() {
    this.firstSignal.update(value => value + 1);
  }

   constructor() {
    effect(() => {
      console.log('The first signal value is:', this.firstSignal());
      console.log('The second signal value is:', this.secondSignal());    
    });
  }
}
