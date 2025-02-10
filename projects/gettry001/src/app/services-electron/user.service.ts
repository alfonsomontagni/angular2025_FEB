import { Injectable, WritableSignal, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: WritableSignal<User[]> = signal([]);

  constructor() {
    this.fetchUsers();
  }

  async fetchUsers() {
    if ((window as any).electronAPI) {  // 🔹 Controlla se `electronAPI` è definito
      this.users.set(await (window as any).electronAPI.getUsers());
    } else {
      console.error("Electron API non trovata! Assicurati che preload.js sia caricato.");
    }
  }

  async addUser(name: string, email: string) {
    if ((window as any).electronAPI) {
      await (window as any).electronAPI.addUser(name, email);
      this.fetchUsers();
    }
  }
}
