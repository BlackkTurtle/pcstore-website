import { Injectable } from '@angular/core';
import { PartOrder } from '../interfaces/partorder.interface';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { CartItemDTO } from '../DTOs/OtherDTOs/CartItemDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : CartItemDTO[] =[]

  constructor() { }
  getcartItemList(){
    return this.cartItemList;
  }
  addtoCart(id : number){
    let index=this.cartItemList.findIndex(x=>x.id==id)
    if (index==-1){
      let porder: CartItemDTO = {
        id:id,
        quantity: 1,
      }
      this.cartItemList.push(porder);
    }
    else{
      this.cartItemList[index].quantity+=1
    }
  }
  getTotalPrice() : number{
    return 0;
  }
  getCount() : number{
    return this.cartItemList.length;
  }
  removeCartItem(index:number){
    if(this.cartItemList[index].quantity==1){
      this.cartItemList.splice(index, 1);
    }else{
      this.cartItemList[index].quantity-=1;
    }
  }
  clearCart(){
    this.cartItemList=[]
  }
}
