import { Component, OnInit } from '@angular/core';
import { GradingAppApiService } from '../../../../app/api/grading-app-api.service';
import { HelperService } from '../../../../app/helpers/services/helper.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  userData: any
  loggedInIp: any;
  labData: any;
  noExam: boolean = true;
  constructor(private api: GradingAppApiService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.userData = this.helperService.getUserObj();
    if(this.userData['user_type'] == '1' && this.userData['exam']){
      this.noExam = false;
      let data = {
        "username":this.userData['username']
      };

      this.api.getLabById(this.userData['ip']['lab']).subscribe(resp => {
        this.labData = resp['body'];
      })
      this.api.getLoggedIp(data).subscribe( resp =>{
          this.loggedInIp = resp['body']['data'];
      })
    }
  }



}
