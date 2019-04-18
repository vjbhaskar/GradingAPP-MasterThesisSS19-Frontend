import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GradingAppApiService } from '../../../app/api/grading-app-api.service';
import { HelperService } from '../../../app/helpers/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });
  constructor(private api: GradingAppApiService,
    private helper: HelperService,
    private router: Router
    ) { }

  ngOnInit() {
    console.log("in home");
  }

  login(){
    console.log("in login");
    this.loginForm.disable();
    this.api.login(this.loginForm.value).subscribe(response => {
      if (response.body.token) {
        //let stringifiedText = JSON.stringify(response.id_token);
        sessionStorage.setItem('token', response.body.token);
        this.helper.showSnackbar('Login Successfull', 'snackBar-success');
        this.router.navigate(["dashboard/feed"]);
        this.loginForm.enable();

      }
    }, error => {
      this.helper.showSnackbar('Invalid login credentials', 'snackBar-error');
      this.loginForm.enable();
    })
  }
}
