import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "@environment/environment"

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all products
   */
  get = (page = -1):Observable<any> => this.http.get(`${environment.apiUrl}/feeds`);

}
