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
}
