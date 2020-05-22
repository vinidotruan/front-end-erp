import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { User } from '@shared/models/user';
import { headers } from '@shared/helpers/headers';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login = (user: string, password: string) => {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { user, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout = () => {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.get<any>(`${environment.apiUrl}/auth/logout`);
    }

    findToken = (token) => {
        return this.http.get(`${environment.apiUrl}/password/find/${token}`);
    }

    recoveryPassword = (recoveryForm) => {
        return this.http.post(`${environment.apiUrl}/password/reset`, recoveryForm);
    }

    isLogged = () => {
        return (this.currentUserValue);
    }
}