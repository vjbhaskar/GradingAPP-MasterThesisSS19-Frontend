import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { DashboardComponent } from '../app/modules/dashboard/dashboard.component';
import { UploadFilesComponent } from '../app/modules/dashboard/upload-files/upload-files.component';
import { FeedComponent } from './modules/dashboard/feed/feed.component';
import { UserManagementComponent } from './modules/dashboard/user-management/user-management.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
          path: 'feed',
          component: FeedComponent
        },
        {
          path: 'user-management',
          component: UserManagementComponent
        },
        {
          path: 'upload-files',
          component: UploadFilesComponent
        },
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
