import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import {CustomResponse} from '../_models/response';
import { LoginModel } from '../_models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<CustomResponse>;
    public currentUser: Observable<CustomResponse>;

    private baseURL="http://localhost:8080/"

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<CustomResponse>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): CustomResponse {
        return this.currentUserSubject.value;
    }

    login(loginModel:LoginModel) {
        return this.http.post<any>(`${this.baseURL+'authenticate'}`, loginModel )
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                    this.currentUserSubject.next(response);

                    this.getUser();
                }

                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    //for service to component
    private getUser: () => void;
    dashboard(fn: () => void) {
    this.getUser = fn;
    // from now on, call getUser wherever you want inside this service
  }
}
