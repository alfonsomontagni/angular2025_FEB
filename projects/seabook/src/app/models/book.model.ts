export interface Book {
  isbn: string;
  title: string;
  authors: string;
  publisher: string;
  publishedDate: string;
  coverImage: string | null;
  description?: string;
  pageCount?: number;
  language?: string;
  categories?: string,
  previewLink?: string;
  found: boolean;
  error?: boolean;
  searchDate?: string;
  mylocation?: string;
  updatedAt?: Date;
  only_pdf?: boolean;
  with_pdf?: boolean;

}

export interface BookPage {
  content: Book[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}