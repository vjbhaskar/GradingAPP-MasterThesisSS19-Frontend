import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from './../../../app/helpers/services/helper.service';
import { FixturesService } from './../../../app/helpers/services/fixtures.service';
import { GradingAppApiService } from './../../../app/api/grading-app-api.service';
import { createRequestParams } from './../../config/http-utils/create-query-params'
import { LabDialogComponent } from './lab-dialog/lab-dialog.component';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  labList: any = [];
  userDataSource: any;
  totalUsers = '';
  displayedColumns = ['sno', 'roomNumber','ips','createdDate', 'actions'];
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
      roomNumber: '',
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
    this.api.getAllLabs()
      .subscribe(response => {
        //console.log('response =', response.headers.get("X-Total-Count"));
        this.labList = response;
        console.log(this.labList);
        this.userDataSource = new MatTableDataSource(this.labList);
        this.totalUsers = this.labList.length;
        this.isLoading = false;
      })
  }

  clearSearch() {
    this.searchObj = {
      roomNumber: '',
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
  createNewUser() {
    this.dialog.open(LabDialogComponent, {
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
   * @param labData User object to be edited
   */
  editLab(labData) {
    this.dialog.open(LabDialogComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      data: labData
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
   * @param labObj User object to be deleted
   */
  deleteLab(labObj) {
    let confirmData = {
      'title': 'Delete Lab',
      'content': '<p>Are you sure to Delete this Lab? </p> <p> Deleting a Lab will delete all their associated information associated from the user and this action cannot be undone. </p>',
      'isContentHtml': true,
      'username':labObj.room_building,
      'isUser': false,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.labList.indexOf(labObj);
        this.api.deleteLab(labObj.id)
          .subscribe(response => {

            if (response.status == 200 || response.status == 204) {
              this.labList.splice(idx, 1);
              this.userDataSource = new MatTableDataSource(this.labList);
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
