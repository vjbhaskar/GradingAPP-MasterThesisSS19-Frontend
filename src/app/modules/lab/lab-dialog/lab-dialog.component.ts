import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../app/helpers/services/helper.service';
import { ConvertModelToFormData } from '../../../../app/helpers/services/convert-object-to-formdata.service';

@Component({
  selector: 'app-lab-dialog',
  templateUrl: './lab-dialog.component.html',
  styleUrls: ['./lab-dialog.component.scss']
})
export class LabDialogComponent implements OnInit {


  labForm = this.fb.group({
    room_building: ['', [Validators.required]],
    lab_admin: [''],
    exam:[''] 
  });
  editLab: boolean = false;
  labId: any;
  labAdmins : any;
  fileObj: any;
  examsList: any;
  ipArr: any;

  constructor(public dialogRef: MatDialogRef<LabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: GradingAppApiService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toFormData: ConvertModelToFormData) {
  }

  ngOnInit() {
    this.api.getLabAdmins().subscribe(resp => {
      this.labAdmins = resp;
    })
    this.api.getAllExams().subscribe(resp => {
      this.examsList =resp;
    })
    if (this.data) {
      this.labForm.patchValue(this.data);
      console.log("labForm", this.labForm.value);
      this.labId = this.data.id;
      this.editLab = true;
      this.ipArr = this.data['lab_ips'];
      this.labForm.controls['lab_admin'].setValue(this.data['lab_admin']['id'])
      
    }
  }

  saveLab() {
    //let labData = this.labForm.value;
    console.log('edit lab =');
    // ------------------- Updating Lab ---------------
    if (this.editLab) {   
      let labData = {
        'room_building':this.labForm.controls['room_building'].value,
        'ip_list': this.fileObj,
        'isNoLabAdmin': 1,
        'lab_admin': this.labForm.controls['lab_admin'].value,
      }
      console.log("labData1",labData);
      if(this.labForm.controls['lab_admin'].value){
        console.log("false");
        labData['isNoLabAdmin'] = 2;
      } else{
        console.log("else");
        labData['isNoLabAdmin'] = 1;
      }

      var data = this.toFormData.convert(labData);
      this.api.updateLab(this.labId,this.data)
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
      console.log("this.labForm.controls['lab_admin'].value ",this.labForm.controls['lab_admin'].value );
      let labData1 = {
        'room_building':this.labForm.controls['room_building'].value,
        'ip_list': this.fileObj,
        'isNoLabAdmin': 1,
        'lab_admin': this.labForm.controls['lab_admin'].value,
        'exam_id': this.labForm.controls['exam'].value,
      }
      console.log("labData1",labData1);
      if(this.labForm.controls['lab_admin'].value){
        console.log("false");
        labData1['isNoLabAdmin'] = 2;
      } else{
        console.log("else");
        labData1['isNoLabAdmin'] = 1;
      }

      var data = this.toFormData.convert(labData1);

      this.api.createLab(data)
        .subscribe(response => {
          if (response) {
            this.helper.showSnackbar('Lab Created Successfully', 'snackBar-success');
            this.closeDialog(response);
          }
        }, error => {
          this.helper.showSnackbar(error.error.title, 'snackBar-error');
        })
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

  get u() { return this.labForm.controls; }
  get profile() { return this.labForm.get('profile')['controls']; }

}

