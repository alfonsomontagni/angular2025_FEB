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
}
