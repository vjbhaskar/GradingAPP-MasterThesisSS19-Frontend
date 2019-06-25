import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelperService } from '../../../../../app/helpers/services/helper.service';
import { FixturesService } from '../../../../../app/helpers/services/fixtures.service';
import { GradingAppApiService } from '../../../../../app/api/grading-app-api.service';
import { ConvertModelToFormData } from '../../../../../app/helpers/services/convert-object-to-formdata.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z,A-Z,0-9]+$")]],
    first_name: [''],
    password: [''],
    last_name: [''],
    user_type:['', Validators.required],
    email: ['', [Validators.email]],
    addType:['1'],
    profile: this.fb.group({
      department: ['',],
    }),
  });
  editUser: boolean = false;
  userId: any;
  fileObj: any;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toFormData: ConvertModelToFormData) {
  }

  ngOnInit() {
    if (this.data) {
      this.userForm.patchValue(this.data);
      this.userId = this.data.id;
      this.editUser = true;
    }
  }

  saveUser() {
    let userData = this.userForm.value;
    console.log('edit user =');
    // ------------------- Updating user ---------------
    if (this.editUser) {
      for (let key in userData) {
        this.data[key] = userData[key]
      }
      this.api.updateUser(this.userId,this.data)
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
      
      if(this.userForm.controls['addType'].value == '2'){
        let userData ={
          'user_list':this.fileObj
        }
  
        var data = this.toFormData.convert(userData);
        this.api.createBulkUser(data)
        .subscribe(response => {
          if (response) {
            this.helper.showSnackbar("Users Created successfully", 'snackBar-success');
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
      } else{
        this.api.createUser(userData)
        .subscribe(response => {
          if (response) {
            this.helper.showSnackbar("User Created successfully", 'snackBar-success');
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
      }
      
    }

  }

  /**
   * Function to add multiple uploded files into an array
   * @param event contains the file that has been uploaded
   */
  onImageUpload(event) {
    if (event.target.files.length > 0) {
      this.fileObj = event.target.files[0];
    }
  }

  addTypeChanged() {
    console.log("in here");
    if (this.userForm.controls['addType'].value == '2') {
      
      console.log("in If");
      this.userForm.get('username').clearValidators();
      this.userForm.get('username').updateValueAndValidity();
      this.userForm.get('user_type').clearValidators();
      this.userForm.get('user_type').updateValueAndValidity();

      //Open dialog
    } else {
      this.userForm.get('username').setValidators([Validators.required]);
      this.userForm.get('username').updateValueAndValidity();
      this.userForm.get('user_type').setValidators([Validators.required]);
      this.userForm.get('user_type').updateValueAndValidity();
    }
  }

  closeDialog(obj = {}) {
    this.dialogRef.close(obj);
  }

  get u() { return this.userForm.controls; }
  get profile() { return this.userForm.get('profile')['controls']; }

}
