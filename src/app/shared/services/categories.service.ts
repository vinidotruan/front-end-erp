import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@shared/models/category';

import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Return all categories
   */
  get = ():Observable<Category[]> => {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  /**
   * Return an category
   */
  find = (id):Observable<Category> => {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  /**
   * Store an category
   */
  store = (category) => {
    return this.http.post(`${environment.apiUrl}/categories`, category);
  }
  /**
   * Update an category
   */
  update = (category) => {
    return this.http.put(`${environment.apiUrl}/categories/${category.id}`, category);
  }

}
