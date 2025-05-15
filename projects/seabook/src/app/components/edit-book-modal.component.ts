import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageBookService } from '../services/page-book.service';

@Component({
  selector: 'app-edit-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
  <div class="bg-white p-6 rounded shadow-lg w-full max-w-6xl mx-4">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Modifica libro</h2>

    <form (ngSubmit)="save()" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div *ngFor="let field of fields">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</label>
        <input
          [type]="field.key === 'pageCount' ? 'number' : 'text'"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          [ngModel]="editableBook()[field.key]"
          (ngModelChange)="updateField(field.key, $event)"
          [name]="field.key"
          [required]="!field.optional"
        />
      </div>
<!-- blocco PDF ----------------------------------------------------- -->
<div class="col-span-1 md:col-span-2 xl:col-span-3 flex gap-6">
  <!-- solo PDF -->
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <input type="checkbox"
           class="h-4 w-4 text-red-600 accent-red-600"
           [checked]="onlyPdfSignal()"
           (change)="toggleOnlyPdf($event)">
    <span class="text-sm">Solo PDF</span>
  </label>

  <!-- con PDF -->
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <input type="checkbox"
           class="h-4 w-4 text-blue-600 accent-blue-600"
           [checked]="withPdfSignal()"
           (change)="toggleWithPdf($event)">
    <span class="text-sm">Con PDF</span>
  </label>
</div>
<!-- --------------------------------------------------------------- -->

      <!-- Pulsanti in fondo -->
      <div class="col-span-1 md:col-span-2 xl:col-span-3 flex justify-end gap-3 mt-6">
        <button type="button"
                (click)="cancel()"
                class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Annulla
        </button>
        <button type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Salva
        </button>
      </div>
    </form>
  </div>
</div>

  `
})
export class EditBookModalComponent {
  /*@Input() set book(value: Book) {
      if (value) {
    this.editableBook.set({ ...value });
      }
  }*/
@Input() set book(value: Book) {
  if (value) {
    this.editableBook.set({ ...value });
    this.onlyPdfSignal.set(!!value.only_pdf);
    this.withPdfSignal.set(!!value.with_pdf);
  }
}

 //@Output() updated = new EventEmitter<Book>();
 // @Output() cancelled = new EventEmitter<void>();

  editableBook = signal<Book>({} as Book);

  fields: { key: keyof Book; label: string; optional?: boolean }[] = [
    { key: 'title', label: 'Titolo' },
    { key: 'authors', label: 'Autori' },
    { key: 'publisher', label: 'Editore' },
    { key: 'publishedDate', label: 'Anno Pubblicazione' },
    { key: 'coverImage', label: 'Copertina (URL)', optional: true },
    { key: 'description', label: 'Descrizione' },
    { key: 'pageCount', label: 'Numero Pagine' },
    { key: 'language', label: 'Lingua' },
    { key: 'categories', label: 'Categorie' },
    { key: 'previewLink', label: 'Link Amazon' },
    { key: 'mylocation', label: 'Posizione' },
  //    { key: 'only_pdf', label: 'Solo _pdf' },
 // { key: 'with_pdf', label: 'Ha _pdf' }
  ];
onlyPdfSignal   = signal(false);
withPdfSignal   = signal(false);

  updateField(key: keyof Book, value: any): void {
    this.editableBook.update(book => ({ ...book, [key]: value }));
  }

  save(): void {
    //this.updated.emit(this.editableBook());

     this.submit();
  }

  cancel(): void {
    this.close.emit();
  }
  @Output() close = new EventEmitter<void>();
@Output() saved = new EventEmitter<void>();
//@Input() book!: Book | null;

pageBookService=inject(PageBookService)
submit(): void {
 // const bookToUpdate = { ...this.editableBook(), found: true }; // forza found = true
       const bookToUpdate: Book = {
        ...this.editableBook(),
        found: true,
        only_pdf: this.onlyPdfSignal(),
        with_pdf: this.withPdfSignal()
      };
  this.pageBookService.updateBook(bookToUpdate).subscribe({
    next: () => {
      this.saved.emit();
      this.close.emit();
    },
    error: err => console.error('Errore aggiornamento:', err)
  });
}

toggleOnlyPdf(ev: Event) {
  const checked = (ev.target as HTMLInputElement).checked;
  this.onlyPdfSignal.set(checked);
  if (checked) { this.withPdfSignal.set(false); }   // non possiamo avere entrambe
}

toggleWithPdf(ev: Event) {
  const checked = (ev.target as HTMLInputElement).checked;
  this.withPdfSignal.set(checked);
  if (checked) { this.onlyPdfSignal.set(false); }
}

}
