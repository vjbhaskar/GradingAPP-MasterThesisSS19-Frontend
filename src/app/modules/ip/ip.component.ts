import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { GradingAppApiService } from 'src/app/api/grading-app-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../app/helpers/services/helper.service';
import { FixturesService } from '../../../app/helpers/services/fixtures.service';
import { IpDialogComponent } from './ip-dialog/ip-dialog.component';
import { IpAssignDialogComponent } from './ip-assign-dialog/ip-assign-dialog.component';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {

  userList: any = [];
  userDataSource: any;
  totalUsers = '';
  displayedColumns = ['sno', 'ip','lab','student','createdDate', 'actions'];
  pageSizeOptions: number[] = [30, 40, 50];
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
  }

  loadInitialData() {
    this.searchObj = {
      roomNumber: '',
      size: 30,
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
    this.api.getAllIps()
      .subscribe(response => {
        this.userList = response;
        this.userDataSource = new MatTableDataSource(this.userList);
        this.totalUsers = this.userList.length;
        this.isLoading = false;
      })
  }

  clearSearch() {
    this.searchObj = {
      roomNumber: '',
      size: 30,
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
  createNewUser() {
    this.dialog.open(IpDialogComponent, {
      width: '600px',
      height: '600px',
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
   * Assign single user
   */
  assignUser() {
    this.dialog.open(IpAssignDialogComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
    })
      .afterClosed()
      .subscribe(response => {
        if (response.status == 200 || response.status == 200) {
          this.helper.showSnackbar('Ip Created Successfully', 'snackBar-success');
          this.search();
        }

      });
  }


  /**
   *
   * @param userData User object to be edited
   */
  editIp(userData) {
    this.dialog.open(IpDialogComponent, {
      width: '600px',
      height: '600px',
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
   * @param ipObj User object to be deleted
   */
  deleteIp(ipObj) {
    let confirmData = {
      'title': 'Delete User',
      'content': '<p>Are you sure to Delete this IP? </p> <p> Deleting a IP will delete all their associated information associated from the user and this action cannot be undone. </p>',
      'isContentHtml': true,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.userList.indexOf(ipObj);
        this.api.deleteIp(ipObj.id)
          .subscribe(response => {
            if (!response) {
              this.userList.splice(idx, 1);
              this.userDataSource = new MatTableDataSource(this.userList);
              this.helper.showSnackbar('Ip Deleted Successfully', 'snackBar-success');
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
