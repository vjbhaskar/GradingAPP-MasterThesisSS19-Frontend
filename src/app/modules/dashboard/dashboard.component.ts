import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../../app/helpers/services/helper.service';
import { DashboardAppsService } from '../../../app/helpers/services/dashboard-apps.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeLink: string;
  dashboardApps: any[];
  collapseSidenav: boolean = false;
  userData: any;
  constructor(private router: Router,
    private helperService: HelperService,
    private route: ActivatedRoute,
    private dashboardAppService: DashboardAppsService) {

    this.router.events.subscribe((res) => {
      this.activeLink = '.' + this.router.url;
      this.activeLink = this.activeLink.split('.').pop().split('?')[0];

    })

    // this.dashboardApps = this.fixture.dashboardSidenavApps();
    this.userData = this.helperService.getUserObj()
    if(this.userData['user_type'] == '1'){
      this.dashboardApps = this.dashboardAppService.studentApps();
    } else  if(this.userData['user_type'] == '3'){
      this.dashboardApps = this.dashboardAppService.labAdminApps();
    }  if(this.userData['user_type'] == '4'){
      this.dashboardApps = this.dashboardAppService.adminApps();
    }

  }

  ngOnInit() {
    console.log("in dashboard Init");
    // this.route.data
    //   .subscribe((data: { userData: any }) => {
    //     sessionStorage.setItem('userObj', JSON.stringify(data.userData.body));
    //     this.userData = data.userData['body']['userDTO'];
    //     // this.dashboardApps = this.helperService.checkUserType( this.userData);
    //   });
  }

  toggleSidenav() {
    this.collapseSidenav = !this.collapseSidenav;
  }

  logout() {
    sessionStorage.removeItem('userObj');
    sessionStorage.removeItem('token');
    this.router.navigate(['home']);
  }
}
