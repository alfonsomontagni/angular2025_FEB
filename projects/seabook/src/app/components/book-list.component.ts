import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { PageBookService } from '../services/page-book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8 max-w-5xl">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Lista Libri</h1>
        <p class="text-gray-600">Visualizza i libri trovati e memorizzati</p>
      </header>

      <div class="flex flex-wrap gap-3 mb-6 items-center">
        <select class="border border-gray-300 rounded-md px-3 py-2 text-sm"
         [ngModel]="pageSize()" 
          (ngModelChange)="pageSize.set($event); loadBooks()">
          <option [value]="10">10</option>
          <option [value]="50">50</option>
          <option [value]="100">100</option>
          <option [value]="999">Tutti</option>
        </select>
        <input
          type="text"
          placeholder="Filtra per lingua"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm"
          [ngModel]="language()"
           (ngModelChange)="language.set($event); loadBooks()" />
        <input
          type="text"
          placeholder="Filtra per posizione"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm"
          [ngModel]="mylocation()"
          (ngModelChange)="mylocation.set($event); loadBooks()" />
        <input
          type="text"
          placeholder="Filtra per titolo"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm"
          [ngModel]="title()"
          (ngModelChange)="title.set($event); loadBooks()" />
        <input
          type="text"
          placeholder="Filtra per autore"
          class="border border-gray-300 rounded-md px-3 py-2 text-sm"
          [ngModel]="authors()"
          (ngModelChange)="authors.set($event); loadBooks()" />
          <button
  (click)="toggleFound()"
  class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
  {{ found() ? 'Solo trovati' : 'Solo non trovati' }}
</button>

                      <button 
  (click)="resetFilters()" 
  class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors">
  Reset filtri
</button>
      </div>

      <div *ngIf="isLoading" class="text-center py-4">
        <div class="loading mx-auto"></div>
        <p class="text-gray-600 mt-2">Caricamento...</p>
      </div>

      <div *ngIf="books.length > 0" class="bg-white rounded-lg shadow-md">
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let book of books" class="p-4 flex items-center">
            <img *ngIf="book.coverImage" [src]="book.coverImage" alt="Copertina" class="book-cover mr-4 rounded shadow" />
            <div class="flex-grow">
              <h2 class="text-lg font-semibold text-gray-800">{{ book.title }}</h2>
              <p class="text-sm text-gray-600">{{ book.authors }}</p>
              <p class="text-sm text-gray-500">Lingua: {{ book.language }} | Posizione: {{ book.mylocation }}</p>
           <p class="text-sm text-gray-500">
  <ng-container *ngIf="book.previewLink">
    <a [href]="book.previewLink" target="_blank" class="text-blue-600 underline hover:text-blue-800">
      Anteprima
    </a>
  </ng-container>
</p>
            </div>


            <button class="ml-4 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-700" (click)="deleteBook(book.isbn)">Elimina</button>
          </li>
        </ul>
      </div>

      <div *ngIf="!isLoading && books.length === 0" class="text-center py-12">
        <p class="text-gray-500">Nessun libro trovato.</p>
      </div>
    </div>
  `,
  styles: [`
    .book-cover {
      width: 60px;
      height: 90px;
      object-fit: cover;
    }
    .loading {
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class BookListComponent {
  books: Book[] = [];
  isLoading = false;
  pageSize = signal(10);
  language = signal('');
  mylocation = signal('');
  title = signal('');
  authors = signal('');
  found = signal(true);

  constructor(private bookService: PageBookService) {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks(0, this.pageSize(),  this.found(), this.language(), this.mylocation(), this.title(), this.authors()).subscribe({
      next: page => {
        this.books = page.content;
        this.isLoading = false;
      },
      error: err => {
        console.error('Errore caricamento:', err);
        this.books = [];
        this.isLoading = false;
      }
    });
  }
resetFilters(): void {
  this.language.set('');
  this.mylocation.set('');
  this.title.set('');
  this.authors.set('');
  this.loadBooks();
  this.found.set(true);

}
toggleFound(): void {
  this.found.set(!this.found());
  this.loadBooks();
}

  deleteBook(isbn: string): void {
    // TODO: chiamata al BE per eliminazione libro se prevista
    this.books = this.books.filter(b => b.isbn !== isbn);
  }
}
