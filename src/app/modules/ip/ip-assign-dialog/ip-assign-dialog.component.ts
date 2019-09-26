import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IpDialogComponent } from '../ip-dialog/ip-dialog.component';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../app/helpers/services/helper.service';
import { ConvertModelToFormData } from '../../../../app/helpers/services/convert-object-to-formdata.service';

@Component({
  selector: 'app-ip-assign-dialog',
  templateUrl: './ip-assign-dialog.component.html',
  styleUrls: ['./ip-assign-dialog.component.scss']
})
export class IpAssignDialogComponent implements OnInit {

  assignlabIpForm = this.fb.group({
    assignType: ['', [Validators.required]],
    lab_ip_id: ['', []],
    lab_id: ['', ],
    student_username: ['', ],
    exam_id: ['',],
    timeslot_id:  ['', ],
    bulkExam:[''],
    deassignExam: []
  });
  editLab: boolean = false;
  labIpId: any;
  labs : any;
  students: any;
  timeslots: any;
  exams: any;
  ips: any;
  fileObj: any;
  constructor(public dialogRef: MatDialogRef<IpAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toFormData: ConvertModelToFormData) {
  }

  ngOnInit() {
    this.api.getAllLabs().subscribe(resp => {
      this.labs = resp;
    })
    this.api.getStudents().subscribe(resp => {
      this.students = resp;
    })
    this.api.getAllExams().subscribe(resp => {
      this.exams = resp;
    })
    this.api.getAllTimeSlots().subscribe(resp => {
      this.timeslots = resp;
    })
    if (this.data) {
      this.assignlabIpForm.patchValue(this.data);
      this.labIpId = this.data.id;
      this.editLab = true;
    }
  }

  saveLab() {
    let labIpData = this.assignlabIpForm.value;
    let url ="";
    if (this.assignlabIpForm.controls['assignType'].value == '1') {
      url = "api/assign_single_ip/"
    } else if(this.assignlabIpForm.controls['assignType'].value == '2'){
      url ="api/assign_students/"
      let data = {
        'student_list':this.fileObj,
        'exam_id': this.assignlabIpForm.controls['bulkExam'].value
      }

      labIpData = this.toFormData.convert(data);
    } else if(this.assignlabIpForm.controls['assignType'].value == '3'){
      url ="api/de_assign_students/"
      labIpData = {
        "exam_id":this.assignlabIpForm.controls['deassignExam'].value
      }

    }

    this.api.assignSingleIp(url,labIpData)
      .subscribe(response => {
        if (response) {
          this.closeDialog(response);
        }
      }, error => {
        this.helper.showSnackbar(error.error.title, 'snackBar-error');
      })

  }

  getLabIps(){
    this.api.getLabById(this.assignlabIpForm.controls['lab_id'].value).subscribe(resp =>{
      this.ips = resp['lab_ips'];
    })
  }

  assignTypeChanged() {
    if (this.assignlabIpForm.controls['assignType'].value == '1') {
      this.assignlabIpForm.get('lab_id').setValidators([Validators.required]);
      this.assignlabIpForm.get('lab_id').updateValueAndValidity();
      this.assignlabIpForm.get('lab_ip_id').setValidators([Validators.required]);
      this.assignlabIpForm.get('lab_ip_id').updateValueAndValidity();
      this.assignlabIpForm.get('student_username').setValidators([Validators.required]);
      this.assignlabIpForm.get('student_username').updateValueAndValidity();
      this.assignlabIpForm.get('exam_id').setValidators([Validators.required]);
      this.assignlabIpForm.get('exam_id').updateValueAndValidity();
      this.assignlabIpForm.get('timeslot_id').setValidators([Validators.required]);
      this.assignlabIpForm.get('timeslot_id').updateValueAndValidity();


      //Open dialog
    } else {
      this.assignlabIpForm.get('lab_id').clearValidators();
      this.assignlabIpForm.get('lab_id').updateValueAndValidity();
      this.assignlabIpForm.get('lab_ip_id').clearValidators();
      this.assignlabIpForm.get('lab_ip_id').updateValueAndValidity();
      this.assignlabIpForm.get('student_username').clearValidators();
      this.assignlabIpForm.get('student_username').updateValueAndValidity();
      this.assignlabIpForm.get('exam_id').clearValidators();
      this.assignlabIpForm.get('exam_id').updateValueAndValidity();
      this.assignlabIpForm.get('timeslot_id').clearValidators();
      this.assignlabIpForm.get('timeslot_id').updateValueAndValidity();

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

  closeDialog(obj = {}) {
    this.dialogRef.close(obj);
  }

  get u() { return this.assignlabIpForm.controls; }
  get profile() { return this.assignlabIpForm.get('profile')['controls']; }

}
