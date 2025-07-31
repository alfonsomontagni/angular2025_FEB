import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge riutilizzabile che mostra lo stato PDF di un libro.
 * - ONLY  => "Solo PDF" (rosso)
 * - WITH  => "Con PDF"  (blu)
 * Se entrambi i flag sono false/non definiti non viene renderizzato.
 */
@Component({
  selector: 'app-ref001-pdf-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="only || with"
          class="mt-2 text-xs font-semibold px-2 py-1 rounded border"
          [ngClass]="{
            'border-2 border-red-500 text-red-600': only,
            'border-2 border-blue-500 text-blue-600': !only && with
          }">
      {{ only ? 'PDF' : 'Con PDF' }}
    </span>
  `,
  styles: []
})
export class Ref001PdfBadgeComponent {
  /** true se il libro è SOLO in PDF */
  @Input() only = false;
  /** true se il libro ha ANCHE un PDF (ma non è solo PDF) */
  @Input() with = false;
}