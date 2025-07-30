import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userListSubject = new BehaviorSubject<User[]>([]);
  userList$ = this.userListSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.getUsers().subscribe((users) => {
      this.userListSubject.next(users);
    });
  }

  getUsers(): Observable<User[]> {
    const url = 'http://localhost:3000/users';
    return this.http.get<User[]>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${id}`, user);
  }

  getSelectedUser(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${id}`);
  }

  delUser(id: string): Observable<User> {
    return this.http.delete<User>(`http://localhost:3000/users/${id}`);
  }
}
