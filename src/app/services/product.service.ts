import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand.interface';
import { Product } from '../interfaces/product.interface';
import { Types } from '../interfaces/types.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/`
    );
  }

  getProductsByNameLike(string:string|null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/NameLike/${string}`
    );
  }
  getProductsByBrandId(id:string|null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/BrandID/${id}`
    );
  }
  getProductsById(id:string|null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/${id}`
    );
  }
  getProductsByTypeId(id:string|null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/TypeID/${id}`
    );
  }

  getProductsByTypesAndBrands(types: Types[], brands: Brand[], minPrice: number, maxPrice: number): Observable<Product[]> {
    const body = { types, brands, minPrice, maxPrice };
    return this.http.post<Product[]>(
        'http://localhost:8002/api/EFProducts/BrandsAndTypes',
        body
    );
}


}