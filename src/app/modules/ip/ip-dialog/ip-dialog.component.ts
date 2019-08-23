import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../app/helpers/services/helper.service';

@Component({
  selector: 'app-ip-dialog',
  templateUrl: './ip-dialog.component.html',
  styleUrls: ['./ip-dialog.component.scss']
})
export class IpDialogComponent implements OnInit {


  labIpForm = this.fb.group({
    ip: ['', [Validators.required]],
    lab_id: ['', Validators.required],
    student_id: ['', Validators.required],
  });
  editLab: boolean = false;
  labIpId: any;
  labs : any;
  students: any;

  constructor(public dialogRef: MatDialogRef<IpDialogComponent>,
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
      this.labIpForm.patchValue(this.data);
      this.labIpId = this.data.id;
      this.editLab = true;
    }
  }

  saveLab() {
    let labIpData = this.labIpForm.value;
    // ------------------- Updating Lab ---------------
    if (this.editLab) {
      for (let key in labIpData) {
        this.data[key] = labIpData[key]
      }
      this.api.updateIp(this.labIpId,this.data)
        .subscribe(response => {
          if (response) {
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
    }
    // --------------------- Creating Lab -----------------
    else {
      this.api.createIp(labIpData)
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

  get u() { return this.labIpForm.controls; }
  get profile() { return this.labIpForm.get('profile')['controls']; }

}

