import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from 'src/app/api/grading-app-api.service';
import { HelperService } from 'src/app/helpers/services/helper.service';

@Component({
  selector: 'app-time-slot-dialog',
  templateUrl: './time-slot-dialog.component.html',
  styleUrls: ['./time-slot-dialog.component.scss']
})
export class TimeSlotDialogComponent implements OnInit {



  timeslotForm = this.fb.group({
    name: ['', [Validators.required]],
    start_time:['', [Validators.required]],
    date:['', [Validators.required]],
    end_time:['', [Validators.required]]
  });
  editTimeslot: boolean = false;
  subjectId: any;
  labs : any;
  students: any;

  constructor(public dialogRef: MatDialogRef<TimeSlotDialogComponent>,
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
      this.timeslotForm.patchValue(this.data);
      this.subjectId = this.data.id;
      this.editTimeslot = true;
    }
  }

  saveTimeSlot() {
    let timeslotData = this.timeslotForm.value;
    var fullDate = this.timeslotForm.controls['date'].value
    console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
        twoDigitMonth = "0" + twoDigitMonth;
    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
        twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear()  + "-" + twoDigitMonth + "-" + twoDigitDate; 
    timeslotData['date'] = currentDate
    console.log(timeslotData['date']);

    console.log('edit lab =');
    // ------------------- Updating Subject ---------------
    if (this.editTimeslot) {
      for (let key in timeslotData) {
        this.data[key] = timeslotData[key]
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
      this.api.createTimeSlot(timeslotData)
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

  get u() { return this.timeslotForm.controls; }
  get profile() { return this.timeslotForm.get('profile')['controls']; }

}


