import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from '.././../../../app/api/grading-app-api.service';
import { HelperService } from '.././../../../app/helpers/services/helper.service';

@Component({
  selector: 'app-exam-dialog',
  templateUrl: './exam-dialog.component.html',
  styleUrls: ['./exam-dialog.component.scss']
})
export class ExamDialogComponent implements OnInit {

  examForm = this.fb.group({
    name: ['', [Validators.required]],
    subject: ['', [Validators.required]],
  });
  editExam: boolean = false;
  examId: any;
  subjectList: []

  constructor(public dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.api.getAllSubjects().subscribe(resp => {
      this.subjectList = resp;
    })
    if (this.data) {
      this.examForm.patchValue(this.data);
      this.examId = this.data.id;
      this.editExam = true;
    }
  }

  saveExam() {
    let examData = this.examForm.value;
    console.log('edit lab =');
    // ------------------- Updating Exam ---------------
    if (this.editExam) {
      for (let key in examData) {
        this.data[key] = examData[key]
      }
      this.api.updateExam(this.examId,this.data)
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
      this.api.createExam(examData)
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

  get u() { return this.examForm.controls; }
  get profile() { return this.examForm.get('profile')['controls']; }

}

