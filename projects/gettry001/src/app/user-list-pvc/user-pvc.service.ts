import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserPvcService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
  users: WritableSignal<User[]> = signal([]); // ✅ Usa WritableSignal per poter modificare il valore

  constructor(private http: HttpClient) {}

  fetchUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe((data) => {
      this.users.set(data); // ✅ Ora funziona correttamente
    });
  }
}
