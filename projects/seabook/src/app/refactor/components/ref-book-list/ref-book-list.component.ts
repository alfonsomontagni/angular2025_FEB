import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefBookService } from '../../services/ref-book.service';
import { RefBookFiltersStore } from '../../services/ref-book-filters.store';
import { RefBook } from '../../models/ref-book.model';
import { RefBookFiltersComponent } from '../ref-book-filters/ref-book-filters.component';
import { RefBookToolbarComponent } from '../ref-book-toolbar/ref-book-toolbar.component';
import { RefBookCardComponent } from '../ref-book-card/ref-book-card.component';
import { RefEditBookModalComponent } from '../ref-edit-book-modal/ref-edit-book-modal.component';

@Component({
  selector: 'app-ref-book-list',
  imports: [
        CommonModule,
    RefBookFiltersComponent,
    RefBookToolbarComponent,
    RefBookCardComponent,
    RefEditBookModalComponent
  ],
  templateUrl: './ref-book-list.component.html',
  styleUrl: './ref-book-list.component.css'
})
export class RefBookListComponent {

  private readonly service = inject(RefBookService);
  private readonly filters = inject(RefBookFiltersStore);

  /** stato libri */
  readonly books = signal<RefBook[]>([]);
  readonly isLoading = signal(false);
  readonly downloaded = signal(new Set<string>());
  editing: RefBook | null = null;

  constructor() {
    /* ricarica ogni volta che cambiano i filtri */
    effect(() => {
      this.load(this.filters.state());
    });
  }

  private load(f: ReturnType<RefBookFiltersStore['state']>): void {
    this.isLoading.set(true);
    this.service.getBooks(f).subscribe({
      next: list => {
        this.books.set(list);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  /* handler da Toolbar/Card */
  onDownloadCover(book: RefBook) { /* … */ }
  onDownloadIsbn() { /* … */ }
  onDownloadTitles() { /* … */ }
  openEdit(b: RefBook) { this.editing = b; }
  delete(isbn: string) { this.books.update(arr => arr.filter(b => b.isbn !== isbn)); }

  reload(): void {
  this.load(this.filters.state());
  this.editing = null;
}

}
