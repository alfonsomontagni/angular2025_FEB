import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchBooksService {
  private http = inject(HttpClient);

  fetchBookByISBN(isbn: string): Observable<Book> {
    const cleanIsbn = isbn.replace(/[-\s]/g, '');
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleanIsbn}`;

    return this.http.get<any>(url).pipe(
      map(data => {
        if (!data.items?.length) {
          return {
            isbn: cleanIsbn,
            title: 'Libro non trovato',
            authors: 'N/A',
            publisher: 'N/A',
            publishedDate: 'N/A',
            coverImage: null,
            found: false
          };
        }
        const info = data.items[0].volumeInfo;
        return {
          isbn: cleanIsbn,
          title: info.title || 'Titolo sconosciuto',
          authors: info.authors?.join(', ') || 'Autore sconosciuto',
          publisher: info.publisher || 'Editore sconosciuto',
          publishedDate: info.publishedDate || 'Data sconosciuta',
          coverImage: info.imageLinks?.thumbnail || null,
          previewLink: info.previewLink || null,
          found: true,
          searchDate: new Date().toISOString()
        };
      }),
      catchError(() => of({
        isbn: cleanIsbn,
        title: 'Errore nella ricerca',
        authors: 'N/A',
        publisher: 'N/A',
        publishedDate: 'N/A',
        coverImage: null,
        found: false,
        error: true
      }))
    );
  }

  searchBooksByIsbnList(isbns: string[]): Observable<Book[]> {
    return combineLatest(isbns.map(isbn => this.fetchBookByISBN(isbn)));
  }
}
