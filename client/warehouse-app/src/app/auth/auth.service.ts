import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthUser } from "./auth-user";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  users : AuthUser[];

  constructor(private http: Http) { }

  login(username, password) : Observable<AuthUser>{
    let toPost = "name=" + username + "&password=" + password;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post('http://37.59.125.162:3000/login', toPost, {
      headers: headers
      })
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  saveJwt(jwt, name) {
    if(jwt) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      localStorage.setItem('currentUser', JSON.stringify({ token: jwt.token, username: name }));
    }
  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    return localStorage.removeItem('currentUser');
  }

}
