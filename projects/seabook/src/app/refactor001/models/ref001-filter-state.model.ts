// ref001-filter-state.model.ts
export interface FilterState {
  pageSize: number;
  language: string;
  mylocation: string;
  title: string;
  authors: string;
  found: boolean;
  updated: boolean | null;
  pdf: 'ALL' | 'ONLY' | 'WITH';
}

export const DEFAULT_FILTER_STATE: FilterState = {
  pageSize: 10,
  language: '',
  mylocation: '',
  title: '',
  authors: '',
  found: true,
  updated: null,
  pdf: 'ALL',
};
