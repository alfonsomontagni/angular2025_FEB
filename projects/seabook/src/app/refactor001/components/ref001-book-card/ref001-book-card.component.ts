// ref001-book-card.component.ts (correzioni)
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ref001Book } from '../../models/ref001-book.model';
import { Ref001PdfBadgeComponent } from '../ref001-pdf-badge.component';
import { Ref001ImgFallbackDirective } from '../../directives/ref001-img-fallback.directive';
import { Ref001RelDatetimePipe } from '../../pipes/ref001-rel-datetime.pipe';
import { Ref001CoverService } from '../../services/ref001-cover.service';

@Component({
  selector: 'app-ref001-book-card',
  standalone: true,
  imports: [
    CommonModule, 
    Ref001PdfBadgeComponent, 
    Ref001ImgFallbackDirective,
    Ref001RelDatetimePipe
  ],
  templateUrl: './ref001-book-card.component.html',
  styleUrl: './ref001-book-card.component.css'
})
export class Ref001BookCardComponent {
  @Input({ required: true }) book!: Ref001Book;
  @Input() coverDownloaded = false;

  @Output() downloadCover = new EventEmitter<Ref001Book>();
  @Output() edit = new EventEmitter<Ref001Book>();
  @Output() delete = new EventEmitter<string>();

  private readonly coverService = inject(Ref001CoverService);

  get coverSrc(): string {
    return `covers/${this.book.isbn}.jpg`;
  }

  get amazonSearchUrl(): string {
    return `https://www.amazon.it/s?k=${encodeURIComponent(this.book.isbn)}`;
  }

  onDownloadCover(): void {
    if (this.coverDownloaded) return;
    
    this.coverService.downloadCover(this.book.isbn, this.book.coverImage || undefined)
      .subscribe(blob => {
        if (blob) {
          this.coverService.saveCoverToFile(blob, this.book.isbn);
          this.downloadCover.emit(this.book);
        }
      });
  }

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    if (this.book.coverImage && img.src !== this.book.coverImage) {
      img.src = this.book.coverImage;
    } else if (img.src !== 'assets/placeholder-cover.svg') {
      img.src = 'assets/placeholder-cover.svg';
    }
  }
}