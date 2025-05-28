import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementDTO } from '../DTOs/advertisementDTO.interface';

@Injectable()
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  getOrderedAdvertisements(): Observable<AdvertisementDTO[]> {
    return this.http.get<AdvertisementDTO[]>(
      `http://localhost:8002/api/Advertisement/GetAllOrderedAdvertisements`
    );
  }
}
