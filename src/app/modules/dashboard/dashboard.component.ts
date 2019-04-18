import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/helpers/services/helper.service';

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
    private route: ActivatedRoute) {

    this.router.events.subscribe((res) => {
      this.activeLink = '.' + this.router.url;
      this.activeLink = this.activeLink.split('.').pop().split('?')[0];

    })

    // this.dashboardApps = this.fixture.dashboardSidenavApps();
    this.dashboardApps = [
      {
        'headerName': 'Dashboard',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [{
          'name': 'Dashboard',
          'icon': 'dashboard',
          'route': '/dashboard/feed',
        }]
      },
      {
        'headerName': 'User Management',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'User Management',
            'route': '/dashboard/user-management',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-users-cog',
          },
        ]
      },
    ]

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
