import { Component, OnInit } from '@angular/core';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { GradingAppApiService } from '../../../app/api/grading-app-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../app/helpers/services/helper.service';
import { FixturesService } from '../../../app/helpers/services/fixtures.service';
import { IpDialogComponent } from '../ip/ip-dialog/ip-dialog.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subjectList: any = [];
  subjectDataSource: any;
  totalSubjects = '';
  displayedColumns = ['sno', 'name','createdDate', 'actions'];
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
    this.api.getAllSubjects()
      .subscribe(response => {
        this.subjectList = response;
        this.subjectDataSource = new MatTableDataSource(this.subjectList);
        this.totalSubjects = this.subjectList.length;
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
    this.subjectDataSource.filter = filterValue.trim().toLowerCase();
  }

  // ------------------------ Create New User ---------------------
  createNewSubject() {
    this.dialog.open(SubjectDialogComponent, {
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
   * @param subjectData subject object to be edited
   */
  editSubject(subjectData) {
    this.dialog.open(SubjectDialogComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
      data: subjectData
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
   * @param subjectObj User object to be deleted
   */
  deleteSubject(subjectObj) {
    let confirmData = {
      'title': 'Delete User',
      'content': '<p>Are you sure to Delete this Subject? </p> <p> Deleting a Subject will delete all their associated information associated from the user and this action cannot be undone. </p>',
      'isContentHtml': true,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.subjectList.indexOf(subjectObj);
        this.api.deleteSubject(subjectObj.id)
          .subscribe(response => {

            if (!response) {
              this.subjectList.splice(idx, 1);
              this.subjectDataSource = new MatTableDataSource(this.subjectList);
              this.helper.showSnackbar('Subject Deleted Successfully', 'snackBar-success');
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
