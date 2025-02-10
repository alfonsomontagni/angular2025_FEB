import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserListPvcComponent } from './user-list-pvc/user-list-pvc.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,UserListPvcComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gettry001';
}
