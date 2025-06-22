import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

    private http = inject(HttpClient);

  dumpBooks(): Observable<string> {
    return this.http.get('/api/exports/books', { responseType: 'text' });
  }

  /** Dump filtrato: qualunque stringa di categoria */
  dumpBooksByCategory(category: string): Observable<string> {
    const catEncoded = encodeURIComponent(category.trim());
    return this.http.get(`/api/exports/books/${catEncoded}`, {
      responseType: 'text',
    });
  }
}
