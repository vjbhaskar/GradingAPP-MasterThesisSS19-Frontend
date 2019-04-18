import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HelperService } from '../../../../../app/helpers/services/helper.service';
import { FixturesService } from '../../../../../app/helpers/services/fixtures.service';
import { GradingAppApiService } from '../../../../../app/api/grading-app-api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern("^[a-z,A-Z,0-9]+$")]],
    first_name: ['', Validators.required],
    password: [''],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    profile: this.fb.group({
      fdnumber: ['', Validators.required],
      department: ['', Validators.required],
    }),
  });
  editUser: boolean = false;
  userId: any;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder) {
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
      this.api.createUser(userData)
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

  get u() { return this.userForm.controls; }
  get profile() { return this.userForm.get('profile')['controls']; }

}
