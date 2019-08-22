import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UploadFilesComponent } from './modules/dashboard/upload-files/upload-files.component';
import { LoaderComponent } from './helpers/components/loader/loader.component';
import { MaterialComponentsModule } from '../app-material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HelperService } from './helpers/services/helper.service';
import { CommonApiService } from './api/common-api.service';
import { GradingAppApiService } from './api/grading-app-api.service';
import { FeedComponent } from './modules/dashboard/feed/feed.component';
import { UserManagementComponent } from './modules/dashboard/user-management/user-management.component';
import { UserDialogComponent } from './modules/dashboard/user-management/user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from './modules/commons/confirm-dialog/confirm-dialog.component';
import { UploadFileDialogComponent } from './modules/dashboard/upload-files/upload-file-dialog/upload-file-dialog.component';
import { ConvertModelToFormData } from './helpers/services/convert-object-to-formdata.service';
import { LabComponent } from './modules/lab/lab.component';
import { LabDialogComponent } from './modules/lab/lab-dialog/lab-dialog.component';
import { IpComponent } from './modules/ip/ip.component';
import { IpDialogComponent } from './modules/ip/ip-dialog/ip-dialog.component';
import { SubjectComponent } from './modules/subject/subject.component';
import { SubjectDialogComponent } from './modules/subject/subject-dialog/subject-dialog.component';
import { ExamComponent } from './modules/exam/exam.component';
import { ExamDialogComponent } from './modules/exam/exam-dialog/exam-dialog.component';
import { DashboardAppsService } from './helpers/services/dashboard-apps.service';
import { IpAssignDialogComponent } from './modules/ip/ip-assign-dialog/ip-assign-dialog.component';
import { TimeSlotComponent } from './modules/time-slot/time-slot.component';
import { TimeSlotDialogComponent } from './modules/time-slot/time-slot-dialog/time-slot-dialog.component';
import { AssignedExamsComponent } from './modules/assigned-exams/assigned-exams.component';
import { StudentExamComponent } from './modules/student-exam/student-exam.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UploadFilesComponent,
    LoaderComponent,
    FeedComponent,
    UserManagementComponent,
    UserDialogComponent,
    ConfirmDialogComponent,
    UploadFileDialogComponent,
    LabComponent,
    LabDialogComponent,
    IpComponent,
    IpDialogComponent,
    SubjectComponent,
    SubjectDialogComponent,
    ExamComponent,
    ExamDialogComponent,
    IpAssignDialogComponent,
    TimeSlotComponent,
    TimeSlotDialogComponent,
    AssignedExamsComponent,
    StudentExamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    FlexLayoutModule
  ],
  entryComponents:[
    UserDialogComponent,
    ConfirmDialogComponent,
    UploadFileDialogComponent,
    LabDialogComponent,
    IpDialogComponent,
    SubjectDialogComponent,
    ExamDialogComponent,
    IpAssignDialogComponent,
    TimeSlotDialogComponent
  ],
  providers: [ 
    HttpClient,
    GradingAppApiService,
    ConvertModelToFormData,
    HelperService,
    CommonApiService,
    HomeComponent,
    DashboardAppsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
