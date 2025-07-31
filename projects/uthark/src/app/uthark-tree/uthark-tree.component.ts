import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'uthark-tree',
  imports: [CommonModule,FormsModule],
  templateUrl: './uthark-tree.component.html',
  styleUrl: './uthark-tree.component.css'
})
export class UtharkTreeComponent {
 /**
   * Griglia 3×7 (0 = vuoto, C = cerchio)
   */
  readonly grid: readonly (readonly ('0' | 'C')[])[] = [
    ['0', 'C', '0'],
    ['0', '0', '0'],
    ['0', 'C', '0'],
    ['C', '0', 'C'],
    ['0', 'C', '0'],
    ['C', '0', 'C'],
    ['0', 'C', '0'],
    ['0', '0', '0'],
    ['0', 'C', '0'],
  ];
}
