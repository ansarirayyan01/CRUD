import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { User } from './interfaces/Users';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, NgIf, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  userList: User[] = [];
  title = 'crud-app';

  constructor(
    private userService: UsersService,
    public router: Router,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

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
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      // console.log("Dark mode status:", isDarkMode);
      if (isDarkMode) {
        this.renderer.addClass(document.body, 'dark-theme');
      } else {
        this.renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }

  toggleDarkMode() {
    // console.log("Toggling dark mode");
    this.themeService.toggleDarkMode();
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
