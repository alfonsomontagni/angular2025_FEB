import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { RootNwsComponent } from './nwsmajor/root-nws/root-nws.component';
import { RootOldComponent } from './oldminus/root-old/root-old.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter([
      { path: 'root-nws', component: RootNwsComponent },
      { path: 'root-old', component: RootOldComponent },
      { path: '', redirectTo: '/root-nws', pathMatch: 'full' }
    ]),
    provideHttpClient() 
  ]

   
};
