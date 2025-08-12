import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/Users';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [RouterLink, CommonModule, SearchComponent],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css',
})
export class GetUsersComponent {
  userList: User[] = [];
  selectedUser: User | undefined;
  showPopup = false;
  userIdtoDelete: string | undefined;
  successMessage: string = '';
  filteredList: User[] = [];
  searchTerm$ = new Subject<string>();
  isLoading = false;
  // changedetection = ChangeDetectionStrategy.OnPush;

  constructor(private userService: UsersService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { message: string };

      if (state.message) {
        this.successMessage = state.message;
        setTimeout(() => {
          this.successMessage = '';
        }, 2500);
        history.replaceState({}, '');
      }
    }
  }
  ngOnInit() {
    this.isLoading = true;
    this.userService.userList$.subscribe((users) => {
      this.userList = users;
      this.filteredList = users; // Initialize filteredList with all users
      this.isLoading = false;
    });
    this.searchTerm$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.filteredList = this.userList.filter(
          (user) =>
            user.name?.toLowerCase().includes(term.toLowerCase())
            // user.email?.toLowerCase().includes(term.toLowerCase())
        );
      });
  }

  onSearch(query: string) {
    this.searchTerm$.next(query);
  }

  editUser(user: User) {
    this.userService.getSelectedUser(user.id).subscribe((data: User) => {
      this.selectedUser = data;
      this.userService.loadUsers(); // Refresh the user list
    });
  }

  openDeletePopup(id: string) {
    this.userIdtoDelete = id;
    this.showPopup = true;
  }

  confirmDelete() {
    if (this.userIdtoDelete) {
      this.isLoading = true; // Show loading state
      this.userService.delUser(this.userIdtoDelete).subscribe((data: User) => {
        this.userList = this.userList.filter(
          (user) => user.id !== this.userIdtoDelete
        );

        this.userService.loadUsers(); // Refresh the user list
        this.showPopup = false;
        this.userIdtoDelete = undefined;

        this.successMessage = 'User deleted successfully!';
        this.isLoading = false; // Hide loading state

        // ⏱️ Auto-hide message after 2.5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 2500);
      });
    }
  }

  cancelDelete() {
    this.showPopup = false;
  }
}
