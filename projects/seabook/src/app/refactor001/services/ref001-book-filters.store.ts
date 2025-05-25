// ref001-book-filters.store.ts
import { Injectable, signal } from "@angular/core";
import { FilterState, DEFAULT_FILTER_STATE } from "../models/ref001-filter-state.model";

@Injectable({ providedIn: 'root' })
export class Ref001BookFiltersStore {
  private readonly _state = signal<FilterState>({ ...DEFAULT_FILTER_STATE });

  readonly state = this._state.asReadonly();

  set(partial: Partial<FilterState>): void {
    this._state.update(s => ({ ...s, ...partial }));
  }

  reset(): void {
    this._state.set({ ...DEFAULT_FILTER_STATE });
  }

  // Metodi di utilità
  setPageSize(size: number): void {
    this.set({ pageSize: size });
  }

  setPdfFilter(filter: FilterState['pdf']): void {
    this.set({ pdf: filter });
  }

  toggleFound(): void {
    this.set({ found: !this._state().found });
  }

  toggleUpdated(): void {
    const current = this._state().updated;
    const next = current === null ? true : current === true ? false : null;
    this.set({ updated: next });
  }

  // Getter per controlli rapidi
  get isDefault(): boolean {
    const current = this._state();
    return JSON.stringify(current) === JSON.stringify(DEFAULT_FILTER_STATE);
  }
}