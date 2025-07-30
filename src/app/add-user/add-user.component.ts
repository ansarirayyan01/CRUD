import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../interfaces/Users';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  userList: User[] = [];
  selectUpdatedUser: User | undefined;
  showDuplicatePopup = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.userService.userList$.subscribe((data: User[]) => {
      this.userList = data;
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userService.getSelectedUser(id).subscribe({
          next: (user) => {
            this.selectUpdatedUser = user;
          },
          error: (err) => {
            this.router.navigate(['/page-not-found']);
          },
        });
      }
    });
  }


  addUser(user: User) {
    const duplicate = this.userList.some(
      (u) => u.email === user.email && u.id !== this.selectUpdatedUser?.id
    );

    if (duplicate) {
      this.showDuplicatePopup = true;
      return;
    }

    // Validate that all required fields are filled
    if (!user.name || !user.email || !user.age) {
      console.log('Form validation failed - missing required fields');
      return;
    }

    // checks for the user is selected
    if (!this.selectUpdatedUser) {
      // Add new user
      this.userService.addUser(user).subscribe((data: User) => {
        this.userList.push(data);

        this.router.navigate(['/get-users'], {
          state: {
            message: 'User added successfully!',
          },
        });
      });
      
    } else {
      // Update existing user
      this.userService
        .updateUser(this.selectUpdatedUser!.id, user)
        .subscribe((data: User) => {
          // Update the user in the local array
          const index = this.userList.findIndex(
            (u) => u.id === this.selectUpdatedUser!.id
          );
          if (index !== -1) {
            this.userList[index] = data;
          }

          this.router.navigate(['/get-users'], {
            state: {
              message: 'User updated successfully!',
            },
          });

          // Reset the form and clear selected user
          this.selectUpdatedUser = undefined;
        });
    }
    this.userService.loadUsers();
  }
  closeDuplicatePopup() {
    this.showDuplicatePopup = false;
  }
}
