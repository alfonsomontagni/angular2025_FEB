
// ref001-cover.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Ref001CoverService {
  private readonly http = inject(HttpClient);

  downloadCover(isbn: string, coverUrl?: string): Observable<Blob | null> {
    if (!coverUrl) {
      return of(null);
    }

    return this.http.get(coverUrl, { responseType: 'blob' }).pipe(
      catchError(err => {
        console.error(`Errore download copertina per ISBN ${isbn}:`, err);
        return of(null);
      })
    );
  }

  saveCoverToFile(blob: Blob, isbn: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover_${isbn}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  checkCoverExists(isbn: string): Observable<boolean> {
    const coverUrl = `covers/${isbn}.jpg`;
    return this.http.head(coverUrl, { observe: 'response' }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}