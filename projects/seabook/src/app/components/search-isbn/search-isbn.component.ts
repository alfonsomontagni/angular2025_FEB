import { Component, computed, inject, signal } from '@angular/core';
import { SearchBooksService } from '../../services/search-books.service';
import { Book } from '../../models/book.model';
import { SearchResultComponent } from './search-result/search-result.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-isbn',
  imports: [CommonModule, FormsModule, SearchResultComponent],
  templateUrl: './search-isbn.component.html',
  styleUrl: './search-isbn.component.css',
})
export class SearchIsbnComponent {
  //isLoading = signal(false);
  trackByIsbn(index: number, book: Book): string {
    return book.isbn;
  }
  /*foundCount(books: Book[]): number {
  return books.filter(b => b.found).length;
}*/
  books = signal<Book[]>([]);

  foundCount = computed(() => this.books().filter((b) => b.found).length);
  isbnInput = signal('');
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  // books$: Observable<Book[]> = signal<Observable<Book[]>>(null as any)();
  searchService = inject(SearchBooksService);
  //constructor(private searchService:SearchBooksService ) {}

  onSearchBooks(): void {
    const isbns = this.parseISBNs(this.isbnInput());
    if (isbns.length === 0) return;

    this.errorMessage.set(null);
    this.isLoading.set(true);
    this.books.set([]);
    this.hasSearched.set(true);

    this.searchService.searchBooksByIsbnList(isbns).subscribe({
      next: (results) => {
        this.books.set(results);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Errore: ' + err.message);
        this.isLoading.set(false);
      },
    });
  }

  private parseISBNs(input: string): string[] {
    return input
      .split(/[\n,;\s]+/)
      .map((i) => i.trim())
      .filter(Boolean);
  }
  successMessage = signal<string | null>(null);
  fileNamePrefix = signal('Lista');
  categoria=signal('cat_varie');
  saveIsbnList(): void {
    //this.successMessage.set('File listaISBN.txt pronto per il download.');
    //setTimeout(() => this.successMessage.set(null), 3000);

    const text = this.isbnInput();
    const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
    const numLibri = lines.length;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    const prefix = this.fileNamePrefix().trim() || 'Lista';
    const fileName = `${prefix}_${numLibri}_libri_${timestamp}.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }

  hasSearched = signal(false);

  saveIsbnTitlesList(): void {
    const bookList = this.books();
    if (!bookList.length) return;

    const lines = bookList.map(
      (b) => `${b.isbn}, ${b.title || 'Libro non trovato'}`
    );

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const prefix = this.fileNamePrefix().trim() || 'Lista';
    const fileName = `${prefix}_${bookList.length}_libri_${timestamp}_titoli.txt`;

    const blob = new Blob([lines.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }

  expandAll = signal(false);

  toggleAllDescriptions() {
    this.expandAll.set(!this.expandAll());
  }
/*
  saveToDb(): void {
    const booksToSave = this.books()
      .filter((book) => book.isbn && book.isbn.trim() !== '')
      .map((book) => ({
        ...book,
        // converto se array, altrimenti lascio com'è
        authors: Array.isArray(book.authors)
          ? book.authors.join(', ')
          : book.authors,
        categories: Array.isArray(book.categories)
          ? book.categories.join(', ')
          : book.categories,
      }));

    //booksToSave.forEach(book=>console.log(book))
    console.log(booksToSave);

    this.searchService.saveBooksToDb(booksToSave).subscribe({
      next: () =>
        this.successMessage.set('Salvataggio completato con successo.'),
      error: (err) =>
        this.errorMessage.set('Errore durante il salvataggio: ' + err.message),
    });
  }
*/



locationsAZ = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7',
  'A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07',
  'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07',
  'C01', 'C02', 'C03', 'C04', 'C05', 'C06', 'C07',
  'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07',
  'E01', 'E02', 'E03', 'E04', 'E05', 'E06', 'E07',
  'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07',
  'G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07',
  'H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07',
  'I01', 'I02', 'I03', 'I04', 'I05', 'I06', 'I07',
  'J01', 'J02', 'J03', 'J04', 'J05', 'J06', 'J07',
  'K01', 'K02', 'K03', 'K04', 'K05', 'K06', 'K07',
];

  locationsX = ['X01', 'X02', 'X03', 'X04', 'X05', 'X06', 'X07'];

  selectedLocation = signal('');

    onlyPdf = signal(false);  

    

  saveToDb(): void {
        const flag = this.onlyPdf();

  if (!this.selectedLocation()) {
    this.errorMessage.set('Seleziona una posizione valida');
    return;
  }
  const categ = this.categoria().trim()
const booksToSave = this.books()
  .filter(book => book.isbn && book.isbn.trim() !== '')
  .map(book => {
    const originalCategories = Array.isArray(book.categories)
      ? book.categories
      : typeof book.categories === 'string' && book.categories.trim() !== ''
        ? [book.categories.trim()]
        : [];

    return {
      ...book,
      authors: Array.isArray(book.authors) ? book.authors.join(', ') : book.authors,
      categories: [categ, ...originalCategories].join(', '), // aggiunge la categoria all'inizio
      mylocation: this.selectedLocation(),
      only_pdf: flag,
      with_pdf: false 
    };
  });

  this.searchService.saveBooksToDb(booksToSave).subscribe({
    next: () => this.successMessage.set('Salvataggio completato con successo.'),
    error: err => this.errorMessage.set('Errore durante il salvataggio: ' + err.message)
  });
}
}
