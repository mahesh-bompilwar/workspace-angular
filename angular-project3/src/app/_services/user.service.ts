import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL="http://localhost:8080/"

  constructor(private http: HttpClient) { }

  // getAll() {
  //     return this.http.get<User[]>(`/users`);
  // }

  register(user: User) {
      return this.http.post(`${this.baseURL+'register'}`, user);
  }

  // delete(id: number) {
  //     return this.http.delete(`/users/${id}`);
  // }
}
