import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all products
   */
  get = (user):Observable<any> => this.http.get(`${environment.apiUrl}/users/${user}/notifications`);
  marAsRead = (user):Observable<any> => this.http.post(`${environment.apiUrl}/users/${user}/notifications/mark-as-read`, {});
}
