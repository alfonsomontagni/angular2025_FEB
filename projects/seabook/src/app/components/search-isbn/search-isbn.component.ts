import { Component, computed, inject, signal } from '@angular/core';
import { SearchBooksService } from '../../services/search-books.service';
import { Book } from '../../models/book.model';
import { SearchResultComponent } from './search-result/search-result.component';
import { CommonModule,NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
 


@Component({
  selector: 'app-search-isbn',
  imports: [CommonModule,   FormsModule,   SearchResultComponent,
 

  ],
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

  foundCount = computed(() =>
    this.books().filter(b => b.found).length
  );
  isbnInput = signal('');
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
 // books$: Observable<Book[]> = signal<Observable<Book[]>>(null as any)();
  searchService = inject(SearchBooksService);
  //constructor(private searchService:SearchBooksService ) {}

   onSearchBooks():void {
const isbns = this.parseISBNs(this.isbnInput());
    if (isbns.length === 0) return;

    this.errorMessage.set(null);
    this.isLoading.set(true);
   this.books.set([]);

    this.searchService.searchBooksByIsbnList(isbns).subscribe({
      next: results => {
        this.books.set(results);
        this.isLoading.set(false);
      },
      error: err => {
        this.errorMessage.set('Errore: ' + err.message);
        this.isLoading.set(false);
      }
    });
  }

   private parseISBNs(input: string): string[] {
    return input
      .split(/[\n,;\s]+/)
      .map(i => i.trim())
      .filter(Boolean);
  }
}
