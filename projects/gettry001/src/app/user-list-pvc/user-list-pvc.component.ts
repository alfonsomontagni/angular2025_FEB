import { Component, computed, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserPvcService } from './user-pvc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list-pvc',
  imports: [CommonModule],
  templateUrl: './user-list-pvc.component.html',
  styleUrl: './user-list-pvc.component.css'
})
export class UserListPvcComponent {
  private userService = inject(UserPvcService); // Usa inject() al posto del constructor
  users = computed(() => this.userService.users()); // Computed Signal

  constructor() {
    this.userService.fetchUsers(); // Chiama l'API quando il componente viene caricato
  }
}
