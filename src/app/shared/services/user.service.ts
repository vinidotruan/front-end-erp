import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "@environment/environment"
import { User } from '@shared/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll = () => this.http.get<User[]>(`${environment.apiUrl}/users`);

    /**
     * Store an user
     */
    store = (user: User) => this.http.post(`${environment.apiUrl}/users`, user);

    /**
     * Update an user
     */
    update = (user: User) => this.http.put(`${environment.apiUrl}/users/${user?.id}`, user);

    /**
     * Find an user
     */
    find = (user) =>  this.http.get<User>(`${environment.apiUrl}/users/${user}`);

    delete = (user) => this.http.delete(`${environment.apiUrl}/users/${user}`)
}