import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { User } from './interfaces/Users';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from "./add-user/add-user.component";
import { GetUsersComponent } from "./get-users/get-users.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userList: User[] = [];
  title = 'crud-app';

  constructor(private userService: UsersService, public router: Router) {}

  showHeader(): boolean {
    const url = this.router.url;
    const path = ['/', '/add-user', '/get-users', '/dashboard'];
    return path.some(
      (path) =>
        path === url || (path === '/add-user' && url.startsWith('/add-user/'))
    );
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.userList = data;
    });
  }

  addUser(user: User) {
    this.userService.addUser(user).subscribe((data: User) => {
      this.userList.push(data);
    });
  }
}
