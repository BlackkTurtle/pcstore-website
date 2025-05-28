import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { PartOrder } from '../interfaces/partorder.interface';

@Injectable()
export class OrderService {

  pOrderDTOs:PartOrderDTO[]=[];

  constructor(private http: HttpClient) {}

  getOrdersByUser(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `http://localhost:8002/api/EFOrders/`
    );
  }
  
  postOrder(email: string, address: string,pOrders:PartOrder[]): Observable<any> {

    for(let i=0;i<pOrders.length;i++){
      const porder = new PartOrderDTO(pOrders[i].article, pOrders[i].quantity, pOrders[i].price);
      this.pOrderDTOs.push(porder);
    }

    const obj = {
      email: email,
      address:address,
      partOrders:this.pOrderDTOs
    };

    return this.http.post(`http://localhost:8002/api/EFOrders/`, obj).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return of({ error: true, message: errorMessage });
  }

}
export class PartOrderDTO {
  article: number;
  quantity: number;
  price: number;

  constructor(article: number, quantity: number, price: number) {
    this.article = article;
    this.quantity = quantity;
    this.price = price;
  }
}