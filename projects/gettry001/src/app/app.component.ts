import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserListPvcComponent } from './user-list-pvc/user-list-pvc.component';
import { UserListSqlComponent } from './components/user-list-sql/user-list-sql.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,
    UserListPvcComponent,
    UserListSqlComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gettry001';
}
