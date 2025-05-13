import { Routes } from '@angular/router';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
import { BookListComponent } from './components/book-list.component';

export const routes: Routes = [
  { path: 'books/add', component: SearchIsbnComponent },
  { path: 'books/list', component: BookListComponent },
 // { path: '', redirectTo: 'books/list', pathMatch: 'full' }
];
