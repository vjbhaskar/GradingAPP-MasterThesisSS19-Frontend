import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
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
  userList: any = [];
  userDataSource: any;
  totalUsers = '';
  displayedColumns = ['sno','name', 'email','fdnumber', 'department', 'createdDate','submitted', 'actions'];
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private helper: HelperService,
    private fixtures: FixturesService
  ) { }

  ngOnInit() {
    this.loadInitialData();
   // this.userObj = this.helper.getUserObj();
  //  console.log("user", this.userObj);
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

    // this.activatedRoute.queryParams.subscribe(params => {
    //   for (let key in params) {
    //     this.searchObj[key] = params[key]
    //     if (key != 'size' && key != 'page' && key != 'sort') {
    //       this.searchPanelOpenState = true;
    //     }
    //   }
    // });
    this.search();
  }

  /**
   * Search Function
   */
  search() {
    // let reqParams = createRequestParams(this.searchObj)
    this.api.getAllFiles()
      .subscribe(response => {
        //console.log('response =', response.headers.get("X-Total-Count"));
        this.userList = response;
        console.log(this.userList);
        this.userDataSource = new MatTableDataSource(this.userList);
        this.totalUsers = this.userList.length;
        this.isLoading = false;
      })
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
    console.log("createNewFile");
    this.dialog.open(UploadFileDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true
    })
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.search();
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
   * @param userObj User object to be deleted
   */
  deleteUser(userObj) {
    let confirmData = {
      'title': 'Delete User',
      'content': '<p>Are you sure to Delete this User? </p> <p> Deleting a user will delete all their associated information associated from the user and this action cannot be undone. </p> <p> Please type <b> <i> delete user </i> </b> in the box below to delete.</p>',
      'isContentHtml': true,
      'username':userObj.username,
      'isUser': true,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.userList.indexOf(userObj);
        this.api.deleteUser(userObj.username)
          .subscribe(response => {

            if (response.status == 200) {
              this.userList.splice(idx, 1);
              this.userDataSource = new MatTableDataSource(this.userList);
              this.helper.showSnackbar('User Deleted Successfully', 'snackBar-success');
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
