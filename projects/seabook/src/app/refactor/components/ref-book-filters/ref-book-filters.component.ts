import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefBookFiltersStore } from '../../services/ref-book-filters.store';
import { FilterState } from '../../models/ref-filter-state.model';

@Component({
  selector: 'app-ref-book-filters',
  imports: [CommonModule,FormsModule],
  templateUrl: './ref-book-filters.component.html',
  styleUrl: './ref-book-filters.component.css'
})
export class RefBookFiltersComponent {
  
 private readonly store = inject(RefBookFiltersStore);
  readonly state = this.store.state;

  update(partial: Partial<FilterState>): void {
    this.store.set(partial);
  }

  reset(): void {
    this.store.set({
      language: '',
      mylocation: '',
      title: '',
      authors: '',
      found: true,
      updated: null,
      pdf: 'ALL'
    });
  }

  toggleFound(): void {
    this.update({ found: !this.state().found });
  }

  toggleUpdated(): void {
    const current = this.state().updated;
    const next = current === null ? true : current === true ? false : null;
    this.update({ updated: next });
  }

  togglePdfFilter(): void {
    const next = this.state().pdf === 'ALL' ? 'ONLY' : this.state().pdf === 'ONLY' ? 'WITH' : 'ALL';
    this.update({ pdf: next });
  }
}
