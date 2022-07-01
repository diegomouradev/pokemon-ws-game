import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(private authService: AuthService) {}

	isLoggedIn$ = this.authService.isLoggedIn$;
	isLoggedOut$ = this.authService.isLoggedOut$;
	allUsers$ = this.authService.getAllUsers();

	user$ = this.authService.user$;
	loginForm = new FormGroup({
		email: new FormControl(),
		password: new FormControl(),
	});

	onLogin(): void {
		const form = this.loginForm.value;
		this.authService.login(form.email, form.password);
	}

	onLogOut() {
		this.authService.logout();
	}
}
