import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from 'src/app/api/grading-app-api.service';
import { HelperService } from 'src/app/helpers/services/helper.service';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent implements OnInit {


  subjectForm = this.fb.group({
    name: ['', [Validators.required]],
  });
  editSubject: boolean = false;
  subjectId: any;
  labs : any;
  students: any;

  constructor(public dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.api.getAllLabs().subscribe(resp => {
      this.labs = resp;
    })
    this.api.getStudents().subscribe(resp => {
      this.students = resp;
    })
    if (this.data) {
      this.subjectForm.patchValue(this.data);
      this.subjectId = this.data.id;
      this.editSubject = true;
    }
  }

  saveSubject() {
    let labIpData = this.subjectForm.value;
    // ------------------- Updating Subject ---------------
    if (this.editSubject) {
      for (let key in labIpData) {
        this.data[key] = labIpData[key]
      }
      this.api.updateSubject(this.subjectId,this.data)
        .subscribe(response => {
          if (response) {
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
    }
    // --------------------- Creating Subject -----------------
    else {
      this.api.createSubject(labIpData)
        .subscribe(response => {
          if (response) {

            this.helper.showSnackbar("Subject Created successfully", 'snackBar-success');
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

  get u() { return this.subjectForm.controls; }
  get profile() { return this.subjectForm.get('profile')['controls']; }

}

