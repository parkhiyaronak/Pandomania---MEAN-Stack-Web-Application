import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
/**
 * Storing the recieved token after login to the localstorage.
 */
  getToken(): string {
    return localStorage.getItem('token');
  }
  /**
   * Post method to "signin" user. 
   * @param email 
   * @param password 
   */

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/signin`;
    return this.http.post<User>(url, {email, password});
  }
  /**
   * Post method to "signup" user.
   * @param Name 
   * @param email 
   * @param password 
   */

  signUp(Name:string, email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/signup`;
    return this.http.post<User>(url, {Name,email,password});
  }
}