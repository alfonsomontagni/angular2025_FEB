// src/app/components/book-local.component.ts
import { Component, model, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalBookService } from '../services/local-book.service';
import { Book } from '../models/book.model';
import { from, EMPTY, timer } from 'rxjs';
import { concatMap, delayWhen, tap } from 'rxjs/operators';


@Component({
  selector: 'app-book-local',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto max-w-3xl px-4 py-6">
      <h2 class="text-2xl font-bold mb-4">Scarica copertine da ISBN</h2>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">Lista ISBN</label>

        <!-- model() = binding bidirezionale diretto -->
        <textarea
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          rows="6"
          [(ngModel)]="isbnInput"
          placeholder="9781234567890
9781234567891,9781234567892"></textarea>
      </div>

      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        (click)="fetchBooks()">
        Recupera & scarica copertine
      </button>

      <ul class="mt-6 space-y-2 text-sm text-gray-700" *ngIf="books().length">
        <li *ngFor="let b of books()">
          {{ b.title }}
          <span *ngIf="b.coverImage">
            – <a [href]="b.coverImage" target="_blank" class="text-blue-600 underline">copertina</a>
          </span>
        </li>
      </ul>
    </div>
  `
})
export class BookLocalComponent {
  /** binding bidirezionale  [(ngModel)]  */
  isbnInput = model<string>('');

  /** elenco di libri restituiti dal backend (readonly) */
  books = signal<Book[]>([]);

  private svc = inject(LocalBookService);

  /* 1. spezza la textarea in un array di ISBN
     2. chiama il backend
     3. salva i libri e scarica le copertine */
  fetchBooks(): void {
    const raw = this.isbnInput();
    const isbns = raw
      .split(/[\n,;\s]+/)
      .map(i => i.trim())
      .filter(Boolean);

    if (!isbns.length) return;

    this.svc.getBooksByIsbnList(isbns).subscribe({
      next: list => {
        this.books.set(list);
        this.downloadImages(list);
      },
      error: err => console.error('Errore nel caricamento libri:', err)
    });
  }

  /** scarica ogni copertina in background */
  private downloadImages(list: Book[]): void {
    list.forEach(async book => {
      if (!book.coverImage) return;

      try {
        const resp = await fetch(book.coverImage, { mode: 'cors' });
        const blob = await resp.blob();

        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href        = url;
        link.download    = `${book.isbn}.jpg`;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.warn(`Copertina non scaricata per ISBN ${book.isbn}`, e);
      }
    });
  }
}
