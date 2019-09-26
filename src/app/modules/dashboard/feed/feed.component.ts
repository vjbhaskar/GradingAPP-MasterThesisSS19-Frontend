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
        "username":this.userData['username'],
        "ip":{}
      };


      this.api.getLabById(this.userData['ip']['lab']).subscribe(resp => {

        this.labData = resp;
      })
      // var findIP = new Promise(r=>{var w=window,a=new (w['RTCPeerConnection']||w['mozRTCPeerConnection']||w['webkitRTCPeerConnection'])({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
      //   findIP.then(function(ip) {
      //   console.log(ip);
      //   let data = {
      //     "ip":{}
      //   };
      //   data['ip'] = ip;
      //   this.api.getLoggedIp(data).subscribe( resp =>{
      //     this.loggedInIp = resp['body']['data'];
      //   })
      // })
      console.log("in init");
      // this.helperService.getLoggedInIP().subscribe(ip => {
      //   console.log("ip",ip);
      //   data['ip'] = ip;
      //   this.api.getLoggedIp(data).subscribe( resp =>{
      //     this.loggedInIp = resp['body']['data'];
      //     console.log("this.loginIp",this.loggedInIp);
      //   })
      // })
    }
  }



}
