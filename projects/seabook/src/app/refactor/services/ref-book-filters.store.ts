import { Injectable, signal } from "@angular/core";
import { FilterState } from "../models/ref-filter-state.model";

@Injectable({ providedIn: 'root'})
export class RefBookFiltersStore {
  private readonly _state = signal<FilterState>({
    pageSize: 10,
    language: '',
    mylocation: '',
    title: '',
    authors: '',
    found: true,
    updated: null,
    pdf: 'ALL',
  });

  readonly state = this._state.asReadonly();

  set(partial: Partial<FilterState>) {
    this._state.update(s => ({ ...s, ...partial }));
  }
}
