import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { RefBook } from "../models/ref-book.model";
import { FilterState } from "../models/ref-filter-state.model";
import { RefPage } from "../models/ref-page.model";

@Injectable({ providedIn: 'root'  })
export class RefBookService {
  constructor(private readonly http: HttpClient) {}

  getBooks(filters: FilterState): Observable<RefBook[]> {
    /*const params = new HttpParams({ fromObject: {
      page: 0,
      size: filters.pageSize,
      found: filters.found,
      language: filters.language,
      mylocation: filters.mylocation,
      title: filters.title,
      authors: filters.authors,
    }});*/
    let params = new HttpParams()
  .set('page', 0)
  .set('size', filters.pageSize)
  .set('found', filters.found);

if (filters.language) {
  params = params.set('language', filters.language);
}
if (filters.mylocation) {
  params = params.set('mylocation', filters.mylocation);
}
if (filters.title) {
  params = params.set('title', filters.title);
}
if (filters.authors) {
  params = params.set('authors', filters.authors);
}
    return this.http
      .get<RefPage<RefBook>>('/api/books', { params })
      .pipe(
        map(p => p.content),
        map(list => this.applyClientFilters(list, filters)),
      );
  }

  private applyClientFilters(list: RefBook[], f: FilterState): RefBook[] {
    return list
      .filter(b => f.updated === null ? true : !!b.updatedAt === f.updated)
      .filter(b => f.pdf === 'ALL'
        ? true
        : f.pdf === 'ONLY' ? b.only_pdf : (b.with_pdf && !b.only_pdf));
  }

  updateBook(book: RefBook) {
  return this.http.put<void>(`/api/books/${book.isbn}`, book);
}

}
