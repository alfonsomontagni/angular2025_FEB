import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NavbarSignalsComponent } from './core/navbar-signals/navbar-signals.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    NavbarSignalsComponent,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dp001';
    // Invece di un booleano, usiamo un Signal<boolean>
    useSignals = signal(false);

    toggleNavbar() {
      // Leggiamo il valore attuale con useSignals()
      // e lo invertiamo con .set(...)
      this.useSignals.set(!this.useSignals());
    }
}
