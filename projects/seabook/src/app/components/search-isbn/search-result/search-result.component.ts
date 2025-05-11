import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule],
  template: `
    <li class="p-6 rounded border flex gap-6 items-start shadow-sm bg-white" [class.bg-gray-100]="!book.found">
      <div class="w-24 h-32 bg-gray-200 flex items-center justify-center overflow-hidden rounded shadow-sm">
        <img
          *ngIf="book.coverImage; else placeholder"
          [src]="book.coverImage"
          [alt]="book.title"
          class="object-cover w-full h-full"
        />
        <ng-template #placeholder>
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </ng-template>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold">{{ book.title }}</h3>
        <p class="text-sm text-gray-900">{{ book.isbn }}</p>
        <p class="text-sm text-gray-500">{{ book.authors }}</p>
        <p *ngIf="book.previewLink">
          <a [href]="book.previewLink" target="_blank" class="text-blue-600 hover:underline">Anteprima</a>
        </p>
      </div>
    </li>
  `
})
export class SearchResultComponent {
  @Input() book!: Book;
}
