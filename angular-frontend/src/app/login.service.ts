import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LoginModel } from './login-model';
 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn=false;

  private baseURL="http://localhost:8080/api/v1/"

  constructor(private httpclient: HttpClient) { }
 
  login(loginModel: LoginModel): Observable<any>{
    console.log("Here addStudent Observable");
    return this.httpclient.post(`${this.baseURL+'login'}`, loginModel);     
  }
}
