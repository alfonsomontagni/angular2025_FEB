import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtharkTreeComponent } from './uthark-tree/uthark-tree.component';

@Component({
  selector: 'app-root',
  imports: [UtharkTreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uthark';
}
