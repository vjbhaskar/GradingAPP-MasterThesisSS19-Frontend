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
    return this.api.postRequestWithToken('api/file/', data);
  }

  updateFile(id,data){
    return this.api.patchRequestWithToken(`api/file/${id}/`,data);
  }

  deleteFile(id){
    return this.api.deleteReqeust(`api/file/${id}/`);
  }

  getAllSubjects(){
    return this.api.getRequestWithToken('api/subject/');
  }
  getAllLabs(){
    return this.api.getRequestWithToken('api/lab/');
  }
  getStudents(){
    return this.api.getRequestWithToken('api/user/students/');
  }
  getLabAdmins(){
    return this.api.getRequestWithToken('api/user/labadmins/');
  }
  // createLab(data){
  //   return this.api.postRequest('api/lab/', data);
  // }

  createLab(data){
    return this.api.postRequestWithToken('api/labIp/bulk', data);
  }
  updateLab(id,data){
    return this.api.patchRequestWithToken(`api/lab/${id}/`,data);
  }

  deleteLab(id){
    return this.api.deleteReqeust(`api/lab/${id}/`);
  }

  getAllIps(){
    return this.api.getRequestWithToken('api/labIp/');
  }
  createIp(data){
    return this.api.postRequestWithToken('api/labIp/', data);
  }
  updateIp(id,data){
    return this.api.patchRequestWithToken(`api/labIp/${id}/`,data);
  }

  deleteIp(id){
    return this.api.deleteReqeust(`api/labIp/${id}/`);
  }

  createSubject(data){
    return this.api.postRequestWithToken('api/subject/', data);
  }

  updateSubject(id,data){
    return this.api.patchRequestWithToken(`api/subject/${id}/`,data);
  }

  deleteSubject(id){
    return this.api.deleteReqeust(`api/subject/${id}/`);
  }



  createBulkUser(data){
    return this.api.postRequestWithToken('api/user/bulkstudents/',data);
  }
  getAllExams(){
    return this.api.getRequestWithToken('api/exam/');
  }

  createExam(data){
    return this.api.postRequestWithToken('api/exam/', data);
  }

  updateExam(id,data){
    return this.api.patchRequestWithToken(`api/exam/${id}/`,data);
  }

  deleteExam(id){
    return this.api.deleteReqeust(`api/exam/${id}/`);
  }

  getLabById(id){
    return this.api.getRequestWithToken(`api/lab/${id}`)
  }

  getAllTimeSlots(){
    return this.api.getRequestWithToken('api/timeSlot/');
  }

  createTimeSlot(data){
    return this.api.postRequestWithToken('api/timeSlot/', data);
  }

  deleteTimeSlot(id){
    return this.api.deleteReqeust(`api/timeSlot/${id}`);
  }

  assignSingleIp(url,data){
    return this.api.postRequestWithToken(url, data);
  }

  getLoggedIp(data){
    return this.api.postRequestWithToken('api/getIp/', data);
  }

  getAdminIp(data){
    return this.api.postRequestWithToken('api/labIp/adminips',data)
  }
  getExamDetails(id){
    return this.api.getRequestWithToken(`api/exam/${id}/`)
  }
  printSingleFile(data){
    return this.api.postRequestWithToken('api/printSingleFile/', data);
  }

  getAllPrintFiles(){
    return this.api.getRequestWithToken('api/print_files/');
  }

  deletePrintFile(id){
    return this.api.deleteReqeust(`api/print_files/${id}/`);
  }
}
