import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CustomResponse } from '../_models/response';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL="http://localhost:8080/"

  constructor(private http: HttpClient) { }


  getUser(customResponse: CustomResponse) {

    console.log("----------currentUser----3------");

        return this.http.post<any>(`${this.baseURL+'getUser'}`, customResponse).pipe(map(response =>{
        return response;
      }));
  }
}
