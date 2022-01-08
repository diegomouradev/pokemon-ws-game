import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<IUser>(null);

  user$: Observable<IUser> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }
  //   Emit the user profile on match of name and password.
  // Store the logging in local storage.
  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>('/api/login', { email, password })
      .pipe(shareReplay());
  }

  logout() {
    this.subject.next(null);
  }
}
