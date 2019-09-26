import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatTableDataSource, Sort } from '@angular/material';
import { GradingAppApiService } from '../../../app/api/grading-app-api.service';
import { HelperService } from '../../../app/helpers/services/helper.service';

@Component({
  selector: 'app-print-files',
  templateUrl: './print-files.component.html',
  styleUrls: ['./print-files.component.scss']
})
export class PrintFilesComponent implements OnInit {
  fileList: any = [];
  userDataSource: any;
  totalUsers = '';
  displayedColumns = ['sno','name','username', 'department', 'createdDate','submitted', 'actions'];
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
      this.api.getAllPrintFiles()
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
        this.api.deletePrintFile(fileObj.id)
          .subscribe(response => {

            if (!response) {
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

  printSingleFile(fileObj){
    let dataObj = {
      file_id: fileObj.id
    }
    this.isLoading = true;
    this.api.printSingleFile(dataObj)
      .subscribe(response => {
        this.search();

        this.isLoading = false;
        this.helper.showSnackbar('File Generated Successfully', 'snackBar-success');
      }, error =>{
        this.helper.showSnackbar('Something Went Wrong. Please Refresh', 'snackBar-error');
      })
  }


}
