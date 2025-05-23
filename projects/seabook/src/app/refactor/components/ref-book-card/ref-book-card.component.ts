import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefBook } from '../../models/ref-book.model';
@Component({
  selector: 'app-ref-book-card',
  imports: [CommonModule],
  templateUrl: './ref-book-card.component.html',
  styleUrl: './ref-book-card.component.css'
})
export class RefBookCardComponent {
 @Input({ required: true }) book!: RefBook;
  @Input() coverDownloaded = false;

  @Output() downloadCover = new EventEmitter<RefBook>();
  @Output() edit = new EventEmitter<RefBook>();
  @Output() delete = new EventEmitter<string>();

  get coverSrc(): string {
    return `covers/${this.book.isbn}.jpg`;
  }

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    if (this.book.coverImage) {
      img.src = this.book.coverImage;
    } else {
      img.src = 'assets/placeholder-cover.svg';
    }
  }
}
