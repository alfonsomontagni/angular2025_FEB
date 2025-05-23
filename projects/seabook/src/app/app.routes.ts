import { Routes } from '@angular/router';
import { SearchIsbnComponent } from './components/search-isbn/search-isbn.component';
import { BookListComponent } from './components/book-list.component';
import { BookLocalComponent } from './components/book-local.component';
import { BookList00Component } from './components/book-list00.component';
import { BookList01Component } from './components/book-list01.component';
import { Poc01Component } from './components/poc/poc01.component';
import { BookList02Component } from './components/book-list02.component';
import { RefBookListComponent } from './refactor/components/ref-book-list/ref-book-list.component';

export const routes: Routes = [
  { path: 'books/add', component: SearchIsbnComponent },
  { path: 'books/list', component: BookListComponent },
  { path: 'books/list00', component: BookList00Component },
  { path: 'books/list01', component: BookList01Component },
  { path: 'books/list02', component: BookList02Component },
  { path: 'books/local', component: BookLocalComponent },
  { path: 'poc01', component: Poc01Component },
  { path: 'books/ref/list', component: RefBookListComponent },
 // { path: '', redirectTo: 'books/list', pathMatch: 'full' }
];
