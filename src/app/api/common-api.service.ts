
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CommonApiService {

  // private API_ENDPOINT = environment.baseUrl;
  private API_ENDPOINT = window.location.origin + environment.baseUrl;



  private httpOptions = {
    headers: new HttpHeaders({
    })
  };

  constructor(private http: HttpClient) {
  }

  //Function to make GET api call
  getRequest(url: any, paramObj?: any): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(this.API_ENDPOINT + url, { observe: 'response', params: paramObj })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }


  //Function to make get api call with token
  getRequestWithToken(url: any): Observable<any> {

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'JWT ' + sessionStorage.getItem('token'));
    return this.http.get(this.API_ENDPOINT + url, this.httpOptions)
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }

  //Function to make POST api call
  postRequest(url: any, data: any): Observable<any> {
    return this.http.post(this.API_ENDPOINT + url, data, { observe: 'response' })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));

  }

    //Function to make POST api call
    postRequestWithToken(url: any, data: any): Observable<any> {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'JWT ' + sessionStorage.getItem('token'));
      return this.http.post(this.API_ENDPOINT + url, data, this.httpOptions)
        .pipe(map(response => {
          return response;
        }), catchError((error: Error) => throwError(error)));

    }

    //Function to make PUT api call
  putRequestWithToken(url: any, data: any): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'JWT ' + sessionStorage.getItem('token'));
    return this.http.put(this.API_ENDPOINT + url, data,this.httpOptions)
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }


  //Function to make PUT api call
  putRequest(url: any, data: any): Observable<any> {
    return this.http.put(this.API_ENDPOINT + url, data, { observe: 'response' })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }

  //Function to make PATCH api call
  patchRequest(url: any, data: any): Observable<any> {
    return this.http.patch(this.API_ENDPOINT + url, data, { observe: 'response' })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));

  }

  patchRequestWithToken(url: any, data: any): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'JWT ' + sessionStorage.getItem('token'));
    return this.http.patch(this.API_ENDPOINT + url, data,this.httpOptions)
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));

  }

  postFormData(url: String, data): Observable<any> {
    return this.http.post(this.API_ENDPOINT + url, data, { observe: 'response' })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }

  //Function to make DELETE api call
  deleteReqeust(url: any): Observable<any> {
    return this.http.delete(this.API_ENDPOINT + url, { observe: 'response' })
      .pipe(map(response => {
        return response;
      }), catchError((error: Error) => throwError(error)));
  }

    //Function to make DELETE api call
    deleteReqeustWithToken(url: any): Observable<any> {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'JWT ' + sessionStorage.getItem('token'));
      return this.http.delete(this.API_ENDPOINT + url,this.httpOptions)
        .pipe(map(response => {
          return response;
        }), catchError((error: Error) => throwError(error)));
    }


}
