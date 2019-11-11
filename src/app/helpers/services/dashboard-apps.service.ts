import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardAppsService {

  constructor() { }


  adminApps(){
    return [
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
      {
        'headerName': 'Files',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Files',
            'route': '/dashboard/files',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-file-alt',
          },
        ]
      },
      {
        'headerName': 'Print Files List',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Print Files List',
            'route': '/dashboard/all-print-files',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-print',
          },
        ]
      },
      {
        'headerName': 'Subjects',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Subjects',
            'route': '/dashboard/subjects',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-book-open',
          },
        ]
      },
      {
        'headerName': 'Exam',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Exam',
            'route': '/dashboard/exam',
            'icon': undefined,
            'fontAwesomeIcon': 'fab fa-leanpub',
          },
        ]
      },
      {
        'headerName': 'Labs',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Labs',
            'route': '/dashboard/labs',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-tv',
          },
        ]
      },
      {
        'headerName': 'Time Slot',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Time Slot',
            'route': '/dashboard/timeslots',
            'icon': undefined,
            'fontAwesomeIcon': 'far fa-clock',
          },
        ]
      },
      {
        'headerName': 'IPs',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'IPs',
            'route': '/dashboard/ips',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-grip-horizontal',
          },
        ]
      },
    ]
  }

  labAdminApps(){
   return  [
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
      {
        'headerName': 'Files',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Files',
            'route': '/dashboard/files',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-file-alt',
          },
        ]
      },
      {
        'headerName': 'Print Files List',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Print Files List',
            'route': '/dashboard/all-print-files',
            'icon': undefined,
            'fontAwesomeIcon': 'fas fa-print',
          },
        ]
      },
      {
        'headerName': 'Assigned Lab',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Assigned Lab',
            'route': '/dashboard/assignedLab',
            'icon': undefined,
            'fontAwesomeIcon': 'fab fa-leanpub',
          },
        ]
      },
    ]
  }

  studentApps(){
    return [
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
        'headerName': 'Exam',
        'icon': 'dashboard',
        'isAccordion': false,
        'apps': [
          {
            'name': 'Exam',
            'route': '/dashboard/student-exam',
            'icon': undefined,
            'fontAwesomeIcon': 'fab fa-leanpub',
          },
        ]
      },
      // {
      //   'headerName': 'Files',
      //   'icon': 'dashboard',
      //   'isAccordion': false,
      //   'apps': [
      //     {
      //       'name': 'Files',
      //       'route': '/dashboard/files',
      //       'icon': undefined,
      //       'fontAwesomeIcon': 'fas fa-file-alt',
      //     },
      //   ]
      // },
    ]
  }
}
