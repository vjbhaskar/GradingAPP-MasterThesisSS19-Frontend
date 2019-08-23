import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { GradingAppApiService } from 'src/app/api/grading-app-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/helpers/services/helper.service';
import { FixturesService } from 'src/app/helpers/services/fixtures.service';
import { SubjectDialogComponent } from '../subject/subject-dialog/subject-dialog.component';
import { TimeSlotDialogComponent } from './time-slot-dialog/time-slot-dialog.component';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {

  timeslotList: any = [];
  timeslotDataSource: any;
  totalTimeslots = '';
  displayedColumns = ['sno', 'name', 'labs', 'date', 'start', 'end', 'createdDate', 'actions'];
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
    this.api.getAllTimeSlots()
      .subscribe(response => {
        this.timeslotList = response;
        this.timeslotDataSource = new MatTableDataSource(this.timeslotList);
        this.totalTimeslots = this.timeslotList.length;
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
    this.timeslotDataSource.filter = filterValue.trim().toLowerCase();
  }

  // ------------------------ Create New User ---------------------
  createNewTimeslot() {
    this.dialog.open(TimeSlotDialogComponent, {
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
  editTimeslot(subjectData) {
    this.dialog.open(TimeSlotDialogComponent, {
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
   * @param timeSlotObj User object to be deleted
   */
  deleteTimeslot(timeSlotObj) {
    let confirmData = {
      'title': 'Delete User',
      'content': '<p>Are you sure to Delete this Time Slot? </p> <p> Deleting a Time Slot will delete all their associated information associated from the user and this action cannot be undone. </p>',
      'isContentHtml': true,

    }
    this.helper.confirmDialog(confirmData,'400px','400px').subscribe(response => {
      if (response) {

        let idx = this.timeslotList.indexOf(timeSlotObj);
        this.api.deleteTimeSlot(timeSlotObj.id)
          .subscribe(response => {

            if (response.status == 200 || response.status == 204) {
              this.timeslotList.splice(idx, 1);
              this.timeslotDataSource = new MatTableDataSource(this.timeslotList);
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
