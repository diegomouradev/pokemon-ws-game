import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	constructor(private authService: AuthService) {}

	isLoggedIn$ = this.authService.isLoggedIn$;
	isLoggedOut$ = this.authService.isLoggedOut$;
	userCreated$;

	user$ = this.authService.user$;
	loginForm = new FormGroup({
		email: new FormControl(),
		password: new FormControl(),
		passwordConfirm: new FormControl(),
	});

	onRegister(): void {
		const form = this.loginForm.value;
		this.userCreated$ = this.authService.createNewUser(form.email, form.password);
	}
}
