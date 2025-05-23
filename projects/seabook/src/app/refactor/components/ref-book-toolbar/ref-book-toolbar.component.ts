import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RefBook } from '../../models/ref-book.model';

@Component({
  selector: 'app-ref-book-toolbar',
  imports: [CommonModule,FormsModule],
  templateUrl: './ref-book-toolbar.component.html',
  styleUrl: './ref-book-toolbar.component.css'
})
export class RefBookToolbarComponent {
 /** Lista libri correnti (input obbligatorio) */
  @Input({ required: true }) books: RefBook[] = [];

  /** Notifica al padre che è avvenuto un download (facoltativo) */
  @Output() downloadIsbn = new EventEmitter<void>();
  @Output() downloadTitles = new EventEmitter<void>();

  /** Prefisso per i file */
  readonly prefix = signal('Lista');

  /* ------------------------------------------------------------------ */
  private timestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
           `_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  }

  private download(content: string, fileName: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ------------------------------------------------------------------ */
  private downloadIsbnList(): void {
    const text = this.books.map(b => b.isbn).join('\n');
    const fileName = `${this.prefix().trim() || 'Lista'}_libri_${this.timestamp()}.txt`;
    this.download(text, fileName);
  }

  private downloadIsbnWithTitles(): void {
    const text = this.books.map(b => `${b.isbn}, ${b.title || 'Libro non trovato'}, ${b.mylocation ?? ''}`).join('\n');
    const fileName = `${this.prefix().trim() || 'Lista'}_libri_${this.timestamp()}_titoli.txt`;
    this.download(text, fileName);
  }

  /* Handler pubblici chiamati dal template */
  handleIsbnDownload(): void {
    if (!this.books.length) return;
    this.downloadIsbnList();
    this.downloadIsbn.emit();
  }

  handleTitlesDownload(): void {
    if (!this.books.length) return;
    this.downloadIsbnWithTitles();
    this.downloadTitles.emit();
  }

}
