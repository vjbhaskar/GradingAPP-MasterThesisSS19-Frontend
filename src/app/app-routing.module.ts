import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { DashboardComponent } from '../app/modules/dashboard/dashboard.component';
import { UploadFilesComponent } from '../app/modules/dashboard/upload-files/upload-files.component';


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
