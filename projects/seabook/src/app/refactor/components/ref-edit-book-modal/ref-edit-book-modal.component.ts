import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefBook } from '../../models/ref-book.model';
import { RefBookService } from '../../services/ref-book.service';

@Component({
  selector: 'app-ref-edit-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ref-edit-book-modal.component.html',
  styleUrls: ['./ref-edit-book-modal.component.css']
})
export class RefEditBookModalComponent {
  /* ────────────────────────────────────────────────────────── */
  @Input() set book(value: RefBook | null) {
    if (value) {
      this.editableBook.set({ ...value });
      this.onlyPdfSignal.set(!!value.only_pdf);
      this.withPdfSignal.set(!!value.with_pdf);
    }
  }
  /** Emesso quando l'utente chiude senza salvare */
  @Output() close = new EventEmitter<void>();
  /** Emesso dopo il salvataggio con successo */
  @Output() saved = new EventEmitter<void>();

  /* Stato del form come signal */
  readonly editableBook = signal<RefBook>({} as RefBook);
  readonly onlyPdfSignal = signal(false);
  readonly withPdfSignal = signal(false);

  /* Campi generati dinamicamente per template a due colonne */
  readonly fields: { key: keyof RefBook; label: string; optional?: boolean }[] = [
    { key: 'title',         label: 'Titolo' },
    { key: 'authors',       label: 'Autori' },
    { key: 'publisher',     label: 'Editore' },
    { key: 'publishedDate', label: 'Anno Pubblicazione' },
    { key: 'coverImage',    label: 'Copertina (URL)', optional: true },
    { key: 'description',   label: 'Descrizione',     optional: true },
    { key: 'pageCount',     label: 'Numero Pagine',   optional: true },
    { key: 'language',      label: 'Lingua' },
    { key: 'categories',    label: 'Categorie',       optional: true },
    { key: 'previewLink',   label: 'Link Amazon',     optional: true },
    { key: 'mylocation',    label: 'Posizione',       optional: true },
  ];

  /* Servizio */
  private readonly service = inject(RefBookService);

  /* ────────────────────────────────────────────────────────── */
  updateField(key: keyof RefBook, value: any): void {
    this.editableBook.update(b => ({ ...b, [key]: value } as RefBook));
  }

  toggleOnlyPdf(ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this.onlyPdfSignal.set(checked);
    if (checked) this.withPdfSignal.set(false);
  }

  toggleWithPdf(ev: Event): void {
    const checked = (ev.target as HTMLInputElement).checked;
    this.withPdfSignal.set(checked);
    if (checked) this.onlyPdfSignal.set(false);
  }

  /* Salva libro */
  save(): void {
    const book: RefBook = {
      ...this.editableBook(),
      only_pdf: this.onlyPdfSignal(),
      with_pdf: this.withPdfSignal(),
      found: true
    } as RefBook;

    this.service.updateBook(book).subscribe({
      next: () => {
        this.saved.emit();
        this.close.emit();
      },
      error: err => console.error('Errore updateBook:', err)
    });
  }

  cancel(): void {
    this.close.emit();
  }
}
