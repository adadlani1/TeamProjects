import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
    JWT_token_url = 'http://miahelpdesk.tk/php/login.php';
  constructor(private httpClient: HttpClient) { }

  Login(username: string, password: string) {
    return this.httpClient.post<{access_token: string, role: string}>(this.JWT_token_url, {username, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }));
  }

  Logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  }

  public LoggedIn() {
    return localStorage.getItem('access_token') !==  null;
  }
}
