import { Component, linkedSignal, signal } from '@angular/core';
import { TabbarNwsComponent } from '../tabbar-nws/tabbar-nws.component';
import { City, Country } from '../../model/country';
import { initialState } from '../../model/data';

@Component({
  selector: 'app-root-nws',
  imports: [TabbarNwsComponent],
  templateUrl: './root-nws.component.html',
  styleUrl: './root-nws.component.css'
})
export class RootNwsComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }

  countries = signal<Country[]>(initialState);
  activeCountry = signal<Country | null>(
    this.countries()[0]
  )

  activeCity = linkedSignal<City | null>(() => {
    return this.activeCountry()?.cities[0] ?? null
  })
}
