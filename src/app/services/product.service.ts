import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsByNameLike(string:string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/NameLike/${string}`
    );
  }
}