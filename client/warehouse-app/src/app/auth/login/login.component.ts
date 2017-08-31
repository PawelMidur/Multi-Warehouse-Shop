import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AuthService } from "../auth.service";
import { Subscription, Observable } from "rxjs";

@Component({
	selector: 'pw-login',
	templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

	loginError: string;
	request: Subscription;
	tryingToLogIn: boolean;

	constructor(public loginValidationBar: MdSnackBar,
							private router: Router,
							private auth: AuthService) {
		this.auth.logout();
	}

	login(user) {
		this.tryingToLogIn = true;
		if (this.request) {
			this.request.unsubscribe();
		}
		this.request = this.auth
			.login(user.username, user.password)
			.delay(1000)
			.subscribe(
				//Is the data
				(lUser) => {
					if(lUser.success) {
						this.loginError = null;
						this.auth.saveJwt(lUser, user.username);
						this.router.navigate(['/page/dashboard']).then(() => {
							this.loginValidationBar.open("Jesteś zalogowany!", "Ok", {
								duration: 3000,
							});
						});
					}
					else {
						this.loginError = "Login i hasło są złe";
						this.tryingToLogIn = false;
					}
				},
				//Error handling
				(err) => {
					this.loginError = "An error occoured during login, see error in console";
					this.tryingToLogIn = false;
				},
				//Observable Done
				() => {
					this.tryingToLogIn = false;
				}
			);
	}

	ngOnInit() {
	}

	ngOnDestroy(){
		if (this.request) {
			this.request.unsubscribe();
		}
	}

}
