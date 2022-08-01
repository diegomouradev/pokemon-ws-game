import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUser } from '../../shared/interfaces/IUser';

const USERS_ENDPOINT: string = 'http://localhost:3000/api/users'; // GET
const REGISTER_ENDPOINT: string = 'http://localhost:3000/api/users'; // POST
// const LOGIN_ENDPOINT: string = 'http://localhost:3000/api/users/login'; // POST
// const LOGOUT_ENDPOINT: string = 'http://localhost:3000/api/users/logout'; // POST

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isLoggedIn$: Observable<boolean>;
	isLoggedOut$: Observable<boolean>;
	userCreated$: Observable<IUser>;
	// BehaviorSubject as an AuthStore.
	private subject = new BehaviorSubject<IUser>(null);
	user$: Observable<IUser> = this.subject.asObservable();

	constructor(private http: HttpClient) {
		this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
		this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
	}

	// GET ALL USERS
	// Get all users and save a reference on the service.

	getAllUsers() {
		const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
		return this.http.get<IUser[]>(USERS_ENDPOINT, { headers });
	}

	// LOGIN
	// Open a new session.
	login(email: string, password: string) {}

	// LOGOUT
	// Close an open session.
	logout() {
		this.subject.next(null);
	}

	// REGISTER
	// Create new User, and automatically initiate a new session.
	createNewUser(email: string, password: string) {
		this.userCreated$ = this.http.post<IUser>(REGISTER_ENDPOINT, { email, password });
		return this.userCreated$;
	}

	// DELETE
	// Delete User and all related data.
	deleteUser() {}

	// UPDATE
	// Put request to update User information.
	updateUserInfo() {}
}
