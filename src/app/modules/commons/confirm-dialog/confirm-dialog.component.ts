import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  enteredName: string;
  canDelete: boolean = true;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
    console.log('data =', this.data);
    if(this.data['isUser']){
      this.canDelete = false;
    }
  }

  check(){
    if(this.enteredName == 'delete user'){
      this.canDelete = true;
    } else{
      this.canDelete = false;
    }
  }

  closeDialog(val) {
    console.log('bool =', val);
    this.dialogRef.close(val);
  }


}
