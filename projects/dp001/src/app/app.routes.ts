import { Routes } from '@angular/router';
import { Angular19Component } from './versions/angular19/angular19.component';
import { AbstractFactoryComponent } from './patterns/creazionali/abstract-factory/abstract-factory.component';

export const routes: Routes = [
    { path: '', redirectTo: 'versions/angular19', pathMatch: 'full' },
    { path: 'versions/angular19', component: Angular19Component },
    { path: 'patterns/creazionali/abstract-factory', component: AbstractFactoryComponent },


];