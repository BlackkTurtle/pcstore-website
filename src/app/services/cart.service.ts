import { Injectable } from '@angular/core';
import { PartOrder } from '../interfaces/partorder.interface';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CartItemDTO } from '../DTOs/OtherDTOs/CartItemDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: CartItemDTO[] = []

  private cartChanged = new BehaviorSubject<CartItemDTO[]>([]);
  cartChanged$ = this.cartChanged.asObservable();

  constructor() { }
  getcartItemList() {
    return this.cartItemList;
  }
  addtoCart(porder: CartItemDTO) {
    let index = this.cartItemList.findIndex(x => x.id == porder.id)
    if (index == -1) {
      this.cartItemList.push(porder);
    }
    else {
      this.cartItemList[index].quantity += 1
    }

    this.cartChanged.next(this.cartItemList);
  }
  getTotalPrice(): number {
    return this.cartItemList.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  getCount(): number {
    return this.cartItemList.length;
  }
  addCartItem(index:number){
    this.cartItemList[index].quantity+=1;
  }
  removeCartItem(index: number) {
    if (this.cartItemList[index].quantity == 1) {
      this.cartItemList.splice(index, 1);
    } else {
      this.cartItemList[index].quantity -= 1;
    }
  }
  clearCart() {
    this.cartItemList = []
  }
}
