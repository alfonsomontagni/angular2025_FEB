import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtharkTreeComponent } from './uthark-tree/uthark-tree.component';
import { AlberoUtharkComponent } from './albero-uthark/albero-uthark.component';

@Component({
  selector: 'app-root',
  imports: [UtharkTreeComponent,AlberoUtharkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uthark';
}
