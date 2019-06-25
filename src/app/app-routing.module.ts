import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/modules/home/home.component';
import { DashboardComponent } from '../app/modules/dashboard/dashboard.component';
import { UploadFilesComponent } from '../app/modules/dashboard/upload-files/upload-files.component';
import { FeedComponent } from './modules/dashboard/feed/feed.component';
import { UserManagementComponent } from './modules/dashboard/user-management/user-management.component';
import { LabComponent } from './modules/lab/lab.component';
import { IpComponent } from './modules/ip/ip.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { ExamComponent } from './modules/exam/exam.component';
import { TimeSlotComponent } from './modules/time-slot/time-slot.component';


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
          path: 'files',
          component: UploadFilesComponent
        },
        {
          path: 'labs',
          component: LabComponent
        },
        {
          path: 'ips',
          component: IpComponent
        },
        {
          path: 'subjects',
          component: SubjectComponent
        },
        {
          path: 'exam',
          component: ExamComponent
        },
        {
          path: 'timeslots',
          component: TimeSlotComponent
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
