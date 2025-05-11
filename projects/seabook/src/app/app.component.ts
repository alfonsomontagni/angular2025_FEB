import { Component } from '@angular/core';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
//import { SearchBookComponent } from './components/search-book/search-book.component';

@Component({
  selector: 'app-root',
  imports: [SearchIsbnComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seabook';
}
