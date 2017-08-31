import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { Subscription, Observable, Subscriber } from "rxjs";

import { AuthService } from "./auth.service"


@Injectable()
export class AuthGuard implements CanActivate {

	toLogIn : boolean;

	constructor(
			private router: Router,
			private http: Http,
			public loginValidationBar: MdSnackBar,
			public auth: AuthService) {
	}

	canActivate() : Observable<boolean> {
		return this.checkToken(this.auth.currentUser()).do( success => {
			if(!success) 
				this.router.navigate(['/login']);
		});	
	}

	checkToken(token){
		let headers = new Headers();
			headers.append('Content-Type', 'application/x-www-form-urlencoded');

		if(token == null){
			return new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next()).map(res => false);
		}
		else {
			return this.http.post('http://37.59.125.162:3000/login/check', "token=" + token.token, {
				headers: headers
				})
				.map(res => res.json().success)
				.catch((error:any) => Observable.throw(error.json().success || 'Server error'));
		}
	}



}
