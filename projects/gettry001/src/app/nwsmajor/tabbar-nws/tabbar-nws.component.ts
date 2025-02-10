import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-tabbar-nws',
  host: {
    class: 'flex gap-2 my-2',
  },
  imports: [],
  templateUrl: './tabbar-nws.component.html',
  styleUrl: './tabbar-nws.component.css',
})
export class TabbarNwsComponent<T extends { id: number }, K extends keyof T> {
  items = input<T[]>([]);
  selectedItem = model<T | null>(null);
  labelField = input<K>('label' as K);
}
