import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '@shared/models/sale';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all sales
   */
  get = (page = -1):Observable<Sale[]> => {
    return this.http.get<Sale[]>(`${environment.apiUrl}/sales?page=${page}`);
  }

  /**
   * Return an sale
   */
  find = (id):Observable<Sale> => {
    return this.http.get<Sale>(`${environment.apiUrl}/sales/${id}`);
  }

  /**
   * Store an sale
   */
  store = (sale: Sale) => {
    return this.http.post(`${environment.apiUrl}/sales`, sale);
  }
  /**
   * Update an sale
   */
  update = (sale) => {
    return this.http.put(`${environment.apiUrl}/sales/${sale.id}`, sale);
  }

}
