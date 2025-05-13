import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookPage } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageBookService {
    private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/books';

    
  getBooks(
    page: number = 0,
    size: number = 10,
    found: boolean = true,
    language?: string,
    mylocation?: string,
    title?: string,
    authors?: string
  ): Observable<BookPage> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('found', found);

    if (language) {
      params = params.set('language', language);
    }

    if (mylocation) {
      params = params.set('mylocation', mylocation);
    }
 if (title) {
      params = params.set('title', title);
    }

    if (authors) {
      params = params.set('authors', authors);
    }

    return this.http.get<BookPage>(this.apiUrl, { params });
  }

}
