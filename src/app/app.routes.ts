import { Routes } from '@angular/router';
import { GetUsersComponent } from './get-users/get-users.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'add-user',
    loadComponent: () =>
      import('./add-user/add-user.component').then((m) => m.AddUserComponent),
  },
  {
    path: 'get-users',
    loadComponent: () =>
      import('./get-users/get-users.component').then((m) => m.GetUsersComponent),
  },

  {
    path: 'add-user/:id',
    loadComponent: () =>
      import('./add-user/add-user.component').then((m) => m.AddUserComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  { path: '**', component: PageNotFoundComponent },
];
