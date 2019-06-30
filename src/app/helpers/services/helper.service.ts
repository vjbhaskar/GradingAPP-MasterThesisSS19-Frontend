import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../modules/commons/confirm-dialog/confirm-dialog.component';
import { GradingAppApiService } from '../../../app/api/grading-app-api.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private api: GradingAppApiService) { }

  showSnackbar(msg: string, colorClass: string) {
    this.snackbar.open(msg, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [colorClass, "rl-snackBar"]
    });
  };

  getUserObj() {
    let userObj = sessionStorage.getItem('userObj');
    if (userObj) {
      return JSON.parse(userObj);
    } else {
      this.router.navigate(["home"]);
    }

  };

    /**
   * Updates the user details and updates session storage
   */
  updateUserData() {
    return new Observable((observer) => {
      let obj = this.getUserObj();
      this.api.getUserDetails(obj['id']).subscribe(response => {
        let stringifiedText = JSON.stringify(response);
          sessionStorage.setItem('userObj', stringifiedText);
        return observer.next(response);
      })
    })
  }

  confirmDialog(data: any,variableWidth?,variableHeight?) {
    let widthpx = variableWidth ? variableWidth : '400px';
    let heightpx = variableHeight ? variableHeight : '300px';
    console.log(variableWidth,variableHeight);
    return new Observable((observer) => {

      this.dialog.open(ConfirmDialogComponent, {
        width: variableWidth,
        height: variableHeight,
        minHeight:195,
        disableClose: true,
        data: data,

      })
        .afterClosed()
        .subscribe(response => {
          return observer.next(response);
        });

    })

  }

}
