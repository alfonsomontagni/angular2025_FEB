import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-signals',
  imports: [
    CommonModule,
    RouterLink,
  ],
  template: `
<nav class="bg-gray-800 text-white p-4 flex space-x-4">
  <!-- Bottone Versions -->
  <div class="relative">
    <button
      class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      (click)="toggleMenuVersions()"
    >
      Versions
    </button>

    <!-- Menu a tendina Versions -->
    <div
      *ngIf="openMenuVersions()"
      class="absolute left-0 mt-2 bg-white text-black shadow-lg rounded w-48 z-10"
    >
      <ul>
        <li
          *ngFor="let version of versions"
          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          <a
            [routerLink]="version.route"
            class="block"
            (click)="closeAllMenus()"
          >
            {{ version.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Bottone Patterns -->
  <div class="relative">
    <button
      class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      (click)="toggleMenuPatterns()"
    >
      Patterns with signals
    </button>

    <!-- Sottomenu Patterns (3 categorie) -->
    <div
      *ngIf="openMenuPatterns()"
      class="absolute left-0 mt-2 bg-white text-black shadow-lg rounded w-64 z-10"
    >
      <!-- Creazionali -->
      <div
        class="px-4 py-2 bg-gray-100 border-b cursor-pointer"
        (click)="toggleMenuCreazionali()"
      >
        <span class="font-semibold">Creazionali</span>
      </div>
      <ul *ngIf="openMenuCreazionali()" class="border-b">
        <li
          *ngFor="let pattern of creazionali"
          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          <a
            [routerLink]="pattern.route"
            class="block"
            (click)="closeAllMenus()"
          >
            {{ pattern.name }}
          </a>
        </li>
      </ul>

      <!-- Comportamentali -->
      <div
        class="px-4 py-2 bg-gray-100 border-b cursor-pointer"
        (click)="toggleMenuComportamentali()"
      >
        <span class="font-semibold">Comportamentali</span>
      </div>
      <ul *ngIf="openMenuComportamentali()" class="border-b">
        <li
          *ngFor="let pattern of comportamentali"
          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          <a
            [routerLink]="pattern.route"
            class="block"
            (click)="closeAllMenus()"
          >
            {{ pattern.name }}
          </a>
        </li>
      </ul>

      <!-- Strutturali -->
      <div
        class="px-4 py-2 bg-gray-100 cursor-pointer"
        (click)="toggleMenuStrutturali()"
      >
        <span class="font-semibold">Strutturali</span>
      </div>
      <ul *ngIf="openMenuStrutturali()" class="border-b">
        <li
          *ngFor="let pattern of strutturali"
          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          <a
            [routerLink]="pattern.route"
            class="block"
            (click)="closeAllMenus()"
          >
            {{ pattern.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  `,
  styles: ``
})
export class NavbarSignalsComponent {

  // Definiamo i signals
  openMenuVersions = signal(false);
  openMenuPatterns = signal(false);
  openMenuCreazionali = signal(false);
  openMenuComportamentali = signal(false);
  openMenuStrutturali = signal(false);

  versions = [
    { name: 'Angular 15', route: '/versions/angular15' },
    { name: 'Angular 16', route: '/versions/angular16' },
    { name: 'Angular 17', route: '/versions/angular17' },
    { name: 'Angular 18', route: '/versions/angular18' },
    { name: 'Angular 19', route: '/versions/angular19' },
  ];

  creazionali = [
    { name: 'Abstract Factory', route: '/patterns/creazionali/abstract-factory' },
    { name: 'Builder', route: '/patterns/creazionali/builder' },
    { name: 'Factory Method', route: '/patterns/creazionali/factory-method' },
    { name: 'Prototype', route: '/patterns/creazionali/prototype' },
    { name: 'Singleton', route: '/patterns/creazionali/singleton' },
  ];

  comportamentali = [
    { name: 'Chain of Responsibility', route: '/patterns/comportamentali/chain-of-responsibility' },
    { name: 'Command', route: '/patterns/comportamentali/command' },
    { name: 'Interpreter', route: '/patterns/comportamentali/interpreter' },
    { name: 'Iterator', route: '/patterns/comportamentali/iterator' },
    { name: 'Mediator', route: '/patterns/comportamentali/mediator' },
    { name: 'Memento', route: '/patterns/comportamentali/memento' },
    { name: 'Observer', route: '/patterns/comportamentali/observer' },
    { name: 'State', route: '/patterns/comportamentali/state' },
    { name: 'Strategy', route: '/patterns/comportamentali/strategy' },
    { name: 'Template Method', route: '/patterns/comportamentali/template-method' },
    { name: 'Visitor', route: '/patterns/comportamentali/visitor' },
  ];

  strutturali = [
    { name: 'Adapter', route: '/patterns/strutturali/adapter' },
    { name: 'Bridge', route: '/patterns/strutturali/bridge' },
    { name: 'Composite', route: '/patterns/strutturali/composite' },
    { name: 'Decorator', route: '/patterns/strutturali/decorator' },
    { name: 'Facade', route: '/patterns/strutturali/facade' },
    { name: 'Flyweight', route: '/patterns/strutturali/flyweight' },
    { name: 'Proxy', route: '/patterns/strutturali/proxy' }
  ];

  // Metodi di toggle che sfruttano i signals
  toggleMenuVersions() {
    this.openMenuVersions.set(!this.openMenuVersions());
  }

  toggleMenuPatterns() {
    this.openMenuPatterns.set(!this.openMenuPatterns());
  }

  toggleMenuCreazionali() {
    this.openMenuCreazionali.set(!this.openMenuCreazionali());
  }

  toggleMenuComportamentali() {
    this.openMenuComportamentali.set(!this.openMenuComportamentali());
  }

  toggleMenuStrutturali() {
    this.openMenuStrutturali.set(!this.openMenuStrutturali());
  }

  // Chiude tutti i menu
  closeAllMenus(): void {
    this.openMenuVersions.set(false);
    this.openMenuPatterns.set(false);
    this.openMenuCreazionali.set(false);
    this.openMenuComportamentali.set(false);
    this.openMenuStrutturali.set(false);
  }
}
