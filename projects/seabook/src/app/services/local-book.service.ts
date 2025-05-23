import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalBookService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/books/by-isbn-list';

  getBooksByIsbnList(isbns: string[]): Observable<Book[]> {
    return this.http.post<Book[]>(this.apiUrl, isbns);
  }
}
