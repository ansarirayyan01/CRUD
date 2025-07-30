import { Component } from '@angular/core';
import { GetUsersComponent } from "../get-users/get-users.component";
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GetUsersComponent, AddUserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
