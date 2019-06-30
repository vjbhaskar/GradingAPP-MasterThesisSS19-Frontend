import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserDialogComponent } from '../../user-management/user-dialog/user-dialog.component';
import { GradingAppApiService } from '../../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../../app/helpers/services/helper.service';
import { ConvertModelToFormData } from '../../../../helpers/services/convert-object-to-formdata.service';


@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {

  uploadForm = this.fb.group({
    is_submitted: [false],
    subject_id: ['', [Validators.required] ]
  });
  editUser: boolean = false;
  userId: any;
  fileObj: any;
  userObj: any;
  fileName: any;
  subjectsList: any;
  subjectId: any;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toFormData: ConvertModelToFormData) {
  }

  ngOnInit() {
    this.userObj = this.helper.getUserObj();
    if(this.userObj['user_type'] == '1' && this.userObj['exam']){
      this.subjectId = this.userObj['exam']['subject'];
    }
    if (this.data) {
      //this.userForm.patchValue(this.data);
      this.userId = this.data.id;
      this.editUser = true;
    }
  }

  /**
   * Function to add multiple uploded files into an array
   * @param event contains the file that has been uploaded
   */
  onImageUpload(event) {
    if (event.target.files.length > 0) {
      this.fileObj = event.target.files[0];
      console.log(this.fileObj);
      this.fileName = this.fileObj.name;
    }
  }

 uploadFile() {
    let userData = this.uploadForm.value;
    // ------------------- Uploading File  ---------------
    userData['name'] =  this.fileName;
    userData['creator_id'] = this.userObj.id;
    userData['file_obj']= this.fileObj;
    userData['subject_id']= this.subjectId;
    var data = this.toFormData.convert(userData);
    if (this.editUser) {
      for (let key in userData) {
        this.data[key] = userData[key]
      }
      this.api.updateFile(this.userId,this.data)
        .subscribe(response => {
          if (response) {
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
    }
    // --------------------- Creating user -----------------
    else {
      this.api.postFile(data)
        .subscribe(response => {
          if (response) {
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
    }

  }

  closeDialog(obj = {}) {
    this.dialogRef.close(obj);
  }

  get u() { return this.uploadForm.controls; }

}
