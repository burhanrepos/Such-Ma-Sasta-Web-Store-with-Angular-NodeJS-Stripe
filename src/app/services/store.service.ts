import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { STORE_BASE_URL } from 'src/environment/environment';



@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(limit = '12', sort = 'desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products${category ? 
    '/category/'+category:''}?sorts=${sort}&limit=${limit}`)
  }

  public getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
  }

}
