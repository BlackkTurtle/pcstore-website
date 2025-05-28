import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand.interface';
import { Product } from '../interfaces/product.interface';
import { Types } from '../interfaces/types.interface';
import { ProductWithRating } from '../DTOs/ProductWithRatingDTO.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/`
    );
  }

  getProductsByNameLike(string: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/NameLike/${string}`
    );
  }
  getProductsByBrandId(id: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/BrandID/${id}`
    );
  }
  getProductsById(id: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/${id}`
    );
  }
  getProductsByTypeId(id: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8002/api/EFProducts/TypeID/${id}`
    );
  }

  getNew2Products(): Observable<ProductWithRating[]> {
    return this.http.get<ProductWithRating[]>(
      `http://localhost:8002/api/Products/New3Products`
    );
  }

  getProductsByTypesAndBrands(types: Types[], brands: Brand[], minPrice: number, maxPrice: number): Observable<Product[]> {
    const body = { types, brands, minPrice, maxPrice };
    return this.http.post<Product[]>(
      'http://localhost:8002/api/EFProducts/BrandsAndTypes',
      body
    );

  }
  getMultipleProductsByIds(ids: number[]): Observable<ProductWithRating[]> {
    const params = ids.reduce((acc, id) => acc.append('ints', id.toString()), new HttpParams());

    return this.http.get<ProductWithRating[]>(`http://localhost:8002/api/Products/MultipleByIds`, { params });
  }
}