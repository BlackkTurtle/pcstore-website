import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand.interface';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {}

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(
      `http://localhost:8002/api/EFBrand/`
    );
  }
  
  getBrandsByNameLike(string:string): Observable<Brand[]> {
    return this.http.get<Brand[]>(
      `http://localhost:8002/api/EFBrand/NameLike/${string}`
    );
  }
}