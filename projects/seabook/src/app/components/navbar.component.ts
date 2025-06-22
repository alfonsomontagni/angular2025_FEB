import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExportService } from '../services/export.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  template: `
    <nav class="bg-gray-800 p-4 shadow-lg">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <h1 class="text-white text-lg font-semibold">📚 SeaBook</h1>
        <ul class="flex space-x-4">
          <li>
            <a routerLink="/books/add" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
              Inserisci
            </a>
          </li>

          <li>
            <a routerLink="books/list" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
              Leggi
            </a>
          </li>
          

          <li>
            <a routerLink="books/ref/list" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
              REF Leggi
            </a>
          </li>
<!-- 
                    <li>
            <a routerLink="poc01" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
              POC 01
            </a>
          </li>
          <li>
            <a routerLink="books/list01" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
             Leggi01
            </a>
          </li>
          <li>
            <a routerLink="books/list02" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
             Leggi02
            </a>
          </li>
          <li>
            <a routerLink="books/list00" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
             old Leggi00
            </a>
          </li>
-->
          <li>
            <a routerLink="books/local" routerLinkActive="text-yellow-400"
               class="text-white hover:text-yellow-400 transition font-medium">
              Local
            </a>
          </li>
          <li>
              <button
    (click)="downloadDump()"
    class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded">
    ⬇️ Dump Books
  </button>
          </li>
            <li class="flex items-center gap-2">
            <input type="text"
                   [ngModel]="categoryInput()"                     
                   (ngModelChange)="categoryInput.set($event)"
                   placeholder="Categoria…"
                   class="px-2 py-1 rounded bg-gray-700 text-white
                          placeholder-gray-400 focus:outline-none
                          focus:ring-2 focus:ring-yellow-400
                          w-32 sm:w-40">

            <button (click)="downloadDumpCategory(categoryInput())"
                    [disabled]="!categoryInput().trim()"
                    class="bg-yellow-600 hover:bg-yellow-700
                           disabled:bg-gray-600 text-white px-3 py-1 rounded">
              ⬇️ Dump Cat.
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {

  private exportSvc = inject(ExportService);
  categoryInput = signal('');    
  downloadDump(): void {
    this.exportSvc.dumpBooks().subscribe({
      next: sql => {
        const blob = new Blob([sql], { type: 'text/sql;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href = url;
        a.download = 'books_dump.sql';
        a.click();
        URL.revokeObjectURL(url);
      },
      error: err => alert('Export fallito: ' + err.message)
    });
  }

  downloadDumpCategory(category?: string): void {
  const dump$ = category?.trim()
    ? this.exportSvc.dumpBooksByCategory(category)
    : this.exportSvc.dumpBooks();

  dump$.subscribe({
    next: sql => {
      const blob = new Blob([sql], { type: 'text/sql;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = `books_dump${category ? '_' + category : ''}.sql`;
      a.click();
      URL.revokeObjectURL(url);
    },
    error: err => alert('Export fallito: ' + err.message)
  });
}

}
