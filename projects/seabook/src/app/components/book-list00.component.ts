import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { PageBookService } from '../services/page-book.service';
import { FormsModule } from '@angular/forms';
import { EditBookModalComponent } from './edit-book-modal.component';

@Component({
  selector: 'app-book-list00',
  standalone: true,
  imports: [CommonModule, FormsModule,EditBookModalComponent],
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
          placeholder="Filtra per lingua 00"
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
  (click)="toggleAggiornati()"
  class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
{{ aggiornati() === true ? 'Solo aggiornati' : (aggiornati() === false ? 'Solo non aggiornati' : 'Tutti') }}
</button>
                      <button 
  (click)="resetFilters()" 
  class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors">
  Reset filtri
</button>
      </div>
<div class="flex justify-end gap-3 mb-6">
   <input
        type="text"
        [ngModel]="fileNamePrefix()"
        (ngModelChange)="fileNamePrefix.set($event)"
        class="border border-gray-300 rounded-md px-3 py-2 text-sm w-32"
        placeholder="Prefisso file"
        title="Prefisso nome file .txt"
      />
  <button
    (click)="downloadIsbnList()"
    class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
    ⬇️ Salva lista ISBN
  </button>

  <button
    (click)="downloadIsbnWithTitles()"
    class="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors">
    ⬇️ Salva lista titoli
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
              <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
  {{ book.title }}
  <span *ngIf="book.updatedAt"
        class="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
    modificato
  </span>
</h2>
              <p class="text-sm text-gray-700">ISBN: {{ book.isbn }}</p>
              <p class="text-sm text-gray-600">{{ book.authors }}</p>
              <p class="text-sm text-gray-500">Lingua: {{ book.language }} | Posizione: {{ book.mylocation }}</p>
           <p class="text-sm text-gray-500">

  <ng-container *ngIf="book.previewLink">
    <a [href]="book.previewLink" target="_blank" class="text-blue-600 underline hover:text-blue-800">
      Anteprima
    </a>
  </ng-container>
</p>
<p class="text-sm text-gray-400">
  Ultima modifica: 
  {{ book.updatedAt ? (book.updatedAt | date:'dd/MM/yyyy HH:mm') : 'N/A' }}
</p>

<p class="text-sm text-gray-500">
  <a [href]="'https://www.amazon.it/s?k=' + book.isbn" target="_blank" class="text-blue-600 underline hover:text-blue-800">
    Amazon
  </a>
</p>
            </div>

<button
 
  class="ml-2 bg-yellow-500 text-white text-sm px-3 py-1 rounded hover:bg-yellow-600"
  (click)="openEditModal(book)">
  Modifica
</button>
            <button class="ml-4 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-700" (click)="deleteBook(book.isbn)">Elimina</button>
          </li>
        </ul>
      </div>

      <div *ngIf="!isLoading && books.length === 0" class="text-center py-12">
        <p class="text-gray-500">Nessun libro trovato.</p>
      </div>
    </div>


    <app-edit-book-modal
  *ngIf="showEditModal()"
  [book]="selectedBook()!"
  (close)="closeEditModal()"
  (saved)="handleBookSaved()">
</app-edit-book-modal>

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
export class BookList00Component {
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
        let result = page.content;

      const aggiornaFiltro = this.aggiornati();
      if (aggiornaFiltro === true) {
        result = result.filter(book => !!book.updatedAt);
      } else if (aggiornaFiltro === false) {
        result = result.filter(book => !book.updatedAt);
      }

      this.books = result;
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
  this.aggiornati.set(null);

}
toggleFound(): void {
  this.found.set(!this.found());
  this.loadBooks();
}
selectedBook = signal<Book | null>(null);
showEditModal = signal(false);

openEditModal(book: Book): void {
  this.selectedBook.set(book);
  this.showEditModal.set(true);
}

closeEditModal(): void {
  this.showEditModal.set(false);
  this.selectedBook.set(null);
}
handleBookSaved(): void {
  this.loadBooks();
  alert('Libro aggiornato con successo');
}

aggiornati = signal<boolean | null>(null); 
// null = tutti, true = solo aggiornati, false = solo non aggiornati
toggleAggiornati(): void {
  const current = this.aggiornati();
  if (current === null) {
    this.aggiornati.set(true);
  } else if (current === true) {
    this.aggiornati.set(false);
  } else {
    this.aggiornati.set(null);
  }
  this.loadBooks();
}
/*
downloadIsbnList(): void {
  const text = this.books.map(book => book.isbn).join('\n');
  this.downloadTextFile(text, 'lista-isbn.txt');
}*/
 downloadIsbnList(): void {
    //this.successMessage.set('File listaISBN.txt pronto per il download.');
    //setTimeout(() => this.successMessage.set(null), 3000);

   const text = this.books.map(book => book.isbn).join('\n');
   // const numLibri = text.length;

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    const prefix = this.fileNamePrefix().trim() || 'Lista';
    const fileName = `${prefix}_libri_${timestamp}.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }
  /*
downloadIsbnWithTitles(): void {
  const text = this.books.map(book => `${book.isbn}, ${book.title}`).join('\n');
  this.downloadTextFile(text, 'isbn-titoli.txt');
}*/
 downloadIsbnWithTitles(): void {
    /*const bookList = this.books();
    if (!bookList.length) return;

    const lines = bookList.map(
      (b) => `${b.isbn}, ${b.title || 'Libro non trovato'}`
    );*/
const bookList = this.books.map(book => `${book.isbn}, ${book.title || 'Libro non trovato'}, ${book.mylocation}`).join('\n');

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const prefix = this.fileNamePrefix().trim() || 'Lista';
    const fileName = `${prefix}_libri_${timestamp}_titoli.txt`;

    const blob = new Blob([bookList], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }
  /*
private downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}*/
 fileNamePrefix = signal('Lista');

  deleteBook(isbn: string): void {
    // TODO: chiamata al BE per eliminazione libro se prevista
    this.books = this.books.filter(b => b.isbn !== isbn);
  }
}
