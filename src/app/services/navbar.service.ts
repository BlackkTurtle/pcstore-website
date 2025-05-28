import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchBarResultDTO } from '../DTOs/OtherDTOs/searchBarResultDTO.interface';

@Injectable()
export class NavbarService {
  constructor(private http: HttpClient) {}
  
  getSearchBarResultByNameLike(string:string): Observable<SearchBarResultDTO> {
    return this.http.get<SearchBarResultDTO>(
      `http://localhost:8002/api/NavBar/GetMultipleProductsByIds/${string}`
    );
  }
}
