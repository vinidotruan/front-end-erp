import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "@environment/environment"
import { User } from '@shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    /**
     * Store an user
     */
    store = (user: User) => {
        return this.http.post(`${environment.apiUrl}/users`, user);
    }

    /**
     * Update an user
     */
    update = (user: User) => {
        return this.http.put(`${environment.apiUrl}/users/${user?.id}`, user);
    }

    /**
     * Find an user
     */
    find = (user) => {
        return this.http.get<User>(`${environment.apiUrl}/users/${user}`);
    }
}