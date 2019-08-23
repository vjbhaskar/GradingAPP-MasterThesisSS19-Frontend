import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../../app/helpers/services/helper.service';
import { FixturesService } from '../../../../app/helpers/services/fixtures.service';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  fileList: any = [];
  userDataSource: any;
  totalUsers = '';
  displayedColumns = ['sno','name', 'department', 'createdDate','submitted', 'actions'];
  pageSizeOptions: number[] = [20, 30, 50];
  pageEvent: PageEvent;
  searchPanelOpenState: boolean = false;
  searchObj: any = {};
  authorities: string[] = [];
  userObj: any;
  isAdmin: boolean = false;
  isLoading: boolean = true;

  constructor(private dialog: MatDialog,
    private api: GradingAppApiService,
    private helper: HelperService,
  ) {   }

  ngOnInit() {
    this.userObj = this.helper.getUserObj();
    this.loadInitialData();
  }

  loadInitialData() {
    this.searchObj = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      authority: '',
      size: 20,
      page: 0,
      sort: 'id,desc'
    }

    this.search();
  }

  /**
   * Search Function
   */
  search() {
    if(this.userObj['user_type'] == '1'){
      this.fileList = this.userObj['files'];
        this.userDataSource = new MatTableDataSource(this.fileList);
        this.totalUsers = this.fileList.length;
        this.isLoading = false;
    } else{
      this.api.getAllFiles()
      .subscribe(response => {
        this.fileList = response;
        this.userDataSource = new MatTableDataSource(this.fileList);
        this.totalUsers = this.fileList.length;
        this.isLoading = false;
      })
    }

  }

  clearSearch() {
    this.searchObj = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      authority: '',
      size: 20,
      page: 0,
      sort: 'id,desc'
    }
    this.search();
  }


  /**
   *
   * @param event When pagination event occurs gets pagination object
   */
  paginationFunction(event?: PageEvent) {
    this.searchObj.size = event.pageSize;
    this.searchObj.page = event.pageIndex;
    this.search();
    return event;
  }

  /**
   *
   * @param event When Sorting event occurs gets column name and direction
   */
  sortData(event: Sort) {
    this.searchObj.sort = event.active + ',' + event.direction;
    this.search();
  }

  /**
   *
   * @param filterValue string to be filtered
   */
  applyFilter(filterValue: string) {
    this.userDataSource.filter = filterValue.trim().toLowerCase();
  }

  // ------------------------ Create New User ---------------------
  createNewFile() {
    this.dialog.open(UploadFileDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true
    })
      .afterClosed()
      .subscribe(response => {
        if (response) {
          if(this.userObj['user_type'] == '1'){
            this.helper.updateUserData().subscribe(resp => {
              this.userObj = this.helper.getUserObj();
              this.search();
            })
          } else{
            this.search();
          }
        }
      });
  }


  /**
   *
   * @param userData User object to be edited
   */
  editFile(userData) {
    this.dialog.open(UploadFileDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true,
      data: userData
    })
      .afterClosed()
      .subscribe(response => {
        if (response.status == 200) {
          this.search();
        }

      });
  }

  /**
   *
   * @param fileObj User object to be deleted
   */
  deleteFile(fileObj) {
    let confirmData = {
      'title': 'Delete File',
      'content': '<p>Are you sure to Delete this File? </p> <p> Deleting a File will delete all their associated information associated from the user and this action cannot be undone. </p>',
      'isContentHtml': true,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.fileList.indexOf(fileObj);
        this.api.deleteFile(fileObj.id)
          .subscribe(response => {

            if (response.status == 200 || response.status == 204) {
              this.fileList.splice(idx, 1);
              this.userDataSource = new MatTableDataSource(this.fileList);
              this.helper.showSnackbar('File Deleted Successfully', 'snackBar-success');
              this.search();
            } else {
              this.helper.showSnackbar('Something Went Wrong. Please Refresh', 'snackBar-error');
            }
          })
      } else {
        console.log('no delete', response);
      }
    })

  }


}
