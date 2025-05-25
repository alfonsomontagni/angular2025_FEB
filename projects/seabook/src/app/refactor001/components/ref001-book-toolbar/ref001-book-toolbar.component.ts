// ref001-book-toolbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ref001Book } from '../../models/ref001-book.model';
import { Ref001FileDownloadService } from '../../services/ref001-file-download.service';

@Component({
  selector: 'app-ref001-book-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ref001-book-toolbar.component.html',
  styleUrl: './ref001-book-toolbar.component.css'
})
export class Ref001BookToolbarComponent {
  @Input({ required: true }) books: Ref001Book[] = [];
  @Output() downloadIsbn = new EventEmitter<void>();
  @Output() downloadTitles = new EventEmitter<void>();

  readonly prefix = signal('Lista');
  private readonly downloadService = inject(Ref001FileDownloadService);

  get hasBooks(): boolean {
    return this.books.length > 0;
  }

  handleIsbnDownload(): void {
    if (!this.hasBooks) return;
    
    const content = this.books.map(b => b.isbn).join('\n');
    const fileName = this.downloadService.generateFileName(this.prefix(), 'isbn');
    
    this.downloadService.downloadTextFile(content, fileName);
    this.downloadIsbn.emit();
  }

  handleTitlesDownload(): void {
    if (!this.hasBooks) return;
    
    const content = this.books.map(b => 
      `${b.isbn}, ${b.title || 'Libro non trovato'}, ${b.mylocation || ''}`
    ).join('\n');
    const fileName = this.downloadService.generateFileName(this.prefix(), 'titoli');
    
    this.downloadService.downloadTextFile(content, fileName);
    this.downloadTitles.emit();
  }

  handleJsonDownload(): void {
    if (!this.hasBooks) return;
    
    const fileName = this.downloadService.generateFileName(this.prefix(), 'data', 'json');
    this.downloadService.downloadJsonFile(this.books, fileName);
  }

  handleCsvDownload(): void {
    if (!this.hasBooks) return;
    
    const csvData = this.books.map(book => ({
      ISBN: book.isbn,
      Titolo: book.title || '',
      Autori: book.authors || '',
      Editore: book.publisher || '',
      Anno: book.publishedDate || '',
      Lingua: book.language || '',
      Posizione: book.mylocation || '',
      PDF: book.only_pdf ? 'Solo PDF' : book.with_pdf ? 'Con PDF' : 'No',
      Trovato: book.found ? 'Sì' : 'No'
    }));
    
    const fileName = this.downloadService.generateFileName(this.prefix(), 'data', 'csv');
    this.downloadService.downloadCsvFile(csvData, fileName);
  }
}