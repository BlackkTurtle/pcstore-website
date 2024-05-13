import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Types } from '../interfaces/types.interface';

@Injectable()
export class TypesService {
  constructor(private http: HttpClient) {}

  getTypes(): Observable<Types[]> {
    return this.http.get<Types[]>(
      `http://localhost:8002/api/EFTypes/`
    );
  }

  getTypesByNameLike(string:string): Observable<Types[]> {
    return this.http.get<Types[]>(
      `http://localhost:8002/api/EFTypes/NameLike/${string}`
    );
  }
}