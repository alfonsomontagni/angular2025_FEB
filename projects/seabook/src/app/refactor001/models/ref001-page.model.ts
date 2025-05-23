export interface Ref001Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;          // dimensione pagina richiesta
  number: number;        // indice pagina corrente (0-based)
  first: boolean;
  last: boolean;
  numberOfElements: number;  // quanti item effettivamente presenti in content
}