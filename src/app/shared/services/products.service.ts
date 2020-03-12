import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "@environment/environment"
import { Product } from '@shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all products
   */
  get = (page = -1):Observable<Product[]> => {
    return this.http.get<Product[]>(`${environment.apiUrl}/products?page=${page}`);
  }

  /**
   * Return an product
   */
  find = (id):Observable<Product> => {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  /**
   * Store an product
   */
  store = (product) => {
    return this.http.post(`${environment.apiUrl}/products`, product);
  }
  /**
   * Update an product
   */
  update = (product) => {
    return this.http.put(`${environment.apiUrl}/products/${product.id}`, product);
  }

}
