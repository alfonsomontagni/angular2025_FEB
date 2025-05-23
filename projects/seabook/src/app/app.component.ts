import { Component } from '@angular/core';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
//import { SearchBookComponent } from './components/search-book/search-book.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seabook';
}
