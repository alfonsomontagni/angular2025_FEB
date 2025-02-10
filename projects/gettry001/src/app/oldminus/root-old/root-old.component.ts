import { Component } from '@angular/core';

@Component({
  selector: 'app-root-old',
  imports: [],
  templateUrl: './root-old.component.html',
  styleUrl: './root-old.component.css'
})
export class RootOldComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
