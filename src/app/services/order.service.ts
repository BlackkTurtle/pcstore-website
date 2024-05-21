import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrdersByUser(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `http://localhost:8002/api/EFOrders/`
    );
  }
}