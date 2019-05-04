import { Injectable } from '@angular/core';
import { CommonApiService } from './common-api.service';

@Injectable()
export class GradingAppApiService {

  constructor(private api: CommonApiService) { }

  login(data) {
    return this.api.postRequest('auth-jwt/', data);
  };

  getAllUsers(){
    return this.api.getRequestWithToken('api/user/');
  }

  createUser(data){
    return this.api.postRequestWithToken(`api/user/`,data);
  }

  getUserDetails(id){
    return this.api.getRequestWithToken(`api/user/${id}/`);
  }

  updateUser(id,data){
    return this.api.patchRequestWithToken(`api/user/${id}/`,data);
  }

  deleteUser(id){
    return this.api.deleteReqeustWithToken(`api/user/${id}/`);
  }

  getAllFiles(){
    return this.api.getRequestWithToken('api/file/');
  }

  postFile(data){
    return this.api.postRequest('api/file/', data);
  }

  updateFile(id,data){
    return this.api.patchRequestWithToken(`api/file/${id}/`,data);
  }
}
