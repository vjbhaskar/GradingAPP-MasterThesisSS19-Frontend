import { Component, OnInit } from '@angular/core';
import { GradingAppApiService } from '../../../app/api/grading-app-api.service';
import { HelperService } from '../../../app/helpers/services/helper.service';
import { MatDialog } from '@angular/material';
import { UploadFileDialogComponent } from '../dashboard/upload-files/upload-file-dialog/upload-file-dialog.component';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.scss']
})
export class StudentExamComponent implements OnInit {
  isNoExam: boolean = true;
  examData : any;
  userObj: any;
  fileList: any;
  flagArray = [];
  isLoading: boolean = true;

  constructor(private dialog: MatDialog,
    private api: GradingAppApiService,
    private helper: HelperService) {
    this.userObj = this.helper.getUserObj();
    this.processData();

  }

  ngOnInit() {
  }

  processData(){
    if(this.userObj && this.userObj['exam']){
      this.fileList = this.userObj['files'];
      this.api.getExamDetails( this.userObj['exam']['id']).subscribe(resp => {
        this.isNoExam = false;
        this.examData = resp.body;

        this.examData.exercise.forEach((element,index) => {
          var obj = {
            hasFile: false,
          };
          this.flagArray.push(obj);

          this.fileList.forEach(fileElement => {
           if(fileElement.exercise == element.id){
            this.flagArray[index]['hasFile'] = true;
           }
         });
         if(index == this.examData.exercise.length-1){
          this.isLoading = false;
          element['processDone']= true;
         }

        });
      })
    } else {
      this.isNoExam = true;
      this.isLoading = false;
    }
  }

  createNewFile(exerciseData,index) {
    this.dialog.open(UploadFileDialogComponent, {
      width: '600px',
      height: '500px',
      disableClose: true,
      data: exerciseData
    })
      .afterClosed()
      .subscribe(response => {
        if (response) {
          if(this.userObj['user_type'] == '1'){
            this.helper.updateUserData().subscribe(resp => {
              this.userObj = this.helper.getUserObj();
              this.fileList = this.userObj['files'];
              this.flagArray[index]['hasFile'] = true;
             // this.search();
            })
          } else{
           // this.search();
          }
        }
      });
  }

  checkFileExists(exercise,file){

    if(file['exercise'] == exercise.id){
      exercise['hasFile'] = true;
      return true;
    } else{
      return false;
    }
  }

    /**
   *
   * @param fileObj User object to be deleted
   */
  deleteFile(fileObj,index) {
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
              this.helper.updateUserData().subscribe(resp => {
                this.flagArray[index]['hasFile'] = false;
                this.userObj = resp;
                this.helper.showSnackbar('File Deleted Successfully', 'snackBar-success');
              })

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
