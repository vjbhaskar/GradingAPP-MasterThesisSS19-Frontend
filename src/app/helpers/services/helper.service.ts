import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

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

}
