import { Injectable } from '@angular/core';
import { CommonApiService } from './common-api.service';

@Injectable()
export class GradingAppApiService {

  constructor(private api: CommonApiService) { }

  login(data) {
    return this.api.postRequest('auth-jwt/', data);
  };

  getAllUsers(){
    return this.api.getRequestWithToken('api/users/');
  }

  createUser(data){
    return this.api.postRequestWithToken(`api/users/`,data);
  }

  updateUser(id,data){
    return this.api.patchRequestWithToken(`api/users/${id}/`,data);
  }

  deleteUser(id){
    return this.api.deleteReqeustWithToken(`api/users/${id}/`);
  }
}
