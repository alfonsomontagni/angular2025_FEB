import { Routes } from '@angular/router';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
import { BookListComponent } from './components/book-list.component';
import { BookLocalComponent } from './components/book-local.component';
import { BookList00Component } from './components/book-list00.component';

export const routes: Routes = [
  { path: 'books/add', component: SearchIsbnComponent },
  { path: 'books/list', component: BookListComponent },
  { path: 'books/list00', component: BookList00Component },
  { path: 'books/local', component: BookLocalComponent },
 // { path: '', redirectTo: 'books/list', pathMatch: 'full' }
];
