import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../services-electron/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list-sql',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list-sql.component.html',
  styleUrl: './user-list-sql.component.css'
})
export class UserListSqlComponent {
  private userService = inject(UserService);
  users = computed(() => this.userService.users());

  newName = '';
  newEmail = '';

  async addUser() {
    if (this.newName && this.newEmail) {
      await this.userService.addUser(this.newName, this.newEmail);
      this.newName = '';
      this.newEmail = '';
    }
  }
}
