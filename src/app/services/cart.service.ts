import { Injectable } from '@angular/core';
import { PartOrder } from '../interfaces/partorder.interface';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : PartOrder[] =[]

  constructor() { }
  getcartItemList(){
    return this.cartItemList;
  }
  addtoCart(product : Product){
    let index=this.cartItemList.findIndex(x=>x.article==product.article)
    if (index==-1){
      let porder: PartOrder = {
        porderId:0,
        article: product.article,
        quantity: 1,
        price: product.price,
        product: product,
        orderId:0
      }
      this.cartItemList.push(porder);
    }
    else{
      this.cartItemList[index].quantity+=1
    }
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:PartOrder)=>{
      grandTotal += a.price*a.quantity;
    })
    return grandTotal;
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
