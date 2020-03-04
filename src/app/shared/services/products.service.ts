import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "@environment/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  store = (product) => {
    return this.http.post(`${environment.apiUrl}/products`, product);
  }
}
