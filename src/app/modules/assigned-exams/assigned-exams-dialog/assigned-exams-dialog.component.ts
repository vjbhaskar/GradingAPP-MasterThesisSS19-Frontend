import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../app/helpers/services/helper.service';
import { ConvertModelToFormData } from '../../../../app/helpers/services/convert-object-to-formdata.service';

@Component({
  selector: 'app-assigned-exams-dialog',
  templateUrl: './assigned-exams-dialog.component.html',
  styleUrls: ['./assigned-exams-dialog.component.scss']
})
export class AssignedExamsDialogComponent implements OnInit {

  uploadForm = this.fb.group({
    is_submitted: [false],
    uploadType: ["",[Validators.required]],
    textareaVal:[""]
  });
  userObj: any;
  isLoading: boolean;
  bulkArr: any;
  userFiles: any;
  allFiles: any;
  isSinglePrint: boolean = false;
  studentObj: any;

  constructor(public dialogRef: MatDialogRef<AssignedExamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toFormData: ConvertModelToFormData) {

  }

  ngOnInit() {
    this.userObj = this.helper.getUserObj();
    this.isLoading = false;

    if (this.data['type'] == 'single') {
      this.userFiles =  this.data['content'];
      console.log("In single", this.data['content']);
      this.studentObj = this.data['content'];
      this.isSinglePrint = true;

    } else{
      this.isLoading = true;
      console.log("In bulk", this.data['content']);
      this.allFiles =  this.data['content'];
      this.printBulk();
    }
  }


  printBulk(){
    let obj = {
    print_type:"bulk",
	  user_id:this.userObj.username,
	  file_list:[]
    }
    let fileArr =[]
    this.allFiles.forEach((element,index) => {

      element.file_ids.forEach(element => {
        fileArr.push(element);
      });

      if(index === this.allFiles.length -1){
        console.log("last",fileArr);
        obj['file_list'] = fileArr
        this.printSingleFile(obj)
      }

    });
  }


  printSingleFile(dataObj){

    this.isLoading = true;
    this.api.printSingleFile(dataObj)
      .subscribe(response => {
        this.closeDialog();
        this.isLoading = false;
        this.helper.showSnackbar('File Generated Successfully', 'snackBar-success');
      }, error =>{
        this.helper.showSnackbar('Something Went Wrong. Please Refresh', 'snackBar-error');
      })
  }

  closeDialog(obj = {}) {
    this.dialogRef.close(obj);
  }

  get u() { return this.uploadForm.controls; }

}
