import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "@environment/environment"
import { Product } from '@shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public filter: string = null;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all products
   */
  get = (page = -1):Observable<Product[]> => this.http.get<Product[]>(`${environment.apiUrl}/products?page=${page}`);

  /**
   * Return an product
   */
  find = (id):Observable<Product> => this.http.get<Product>(`${environment.apiUrl}/products/${id}`);

  /**
   * Store an product
   */
  store = (product) =>  this.http.post(`${environment.apiUrl}/products`, product);
  
  /**
   * Update an product
   */
  update = (product) => this.http.put(`${environment.apiUrl}/products/${product.id}`, product);

  /**
   * Search products
   */
  search = (filter, page?) => {
    this.filter = filter;
    return this.http.get(`${environment.apiUrl}/products/search?${filter}&page=${(page)?page:1}`);
  }

}
