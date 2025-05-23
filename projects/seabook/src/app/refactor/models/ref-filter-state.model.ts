// refactor/models/filter-state.model.ts
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
