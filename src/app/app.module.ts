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
    ConfirmDialogComponent
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
    ConfirmDialogComponent
  ],
  providers: [ 
    HttpClient,
    GradingAppApiService,
    HelperService,
    CommonApiService,
    HomeComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
