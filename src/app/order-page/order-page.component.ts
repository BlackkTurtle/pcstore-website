import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PartOrder } from '../interfaces/partorder.interface';
import { Product } from '../interfaces/product.interface';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit{

  errorMessage:string='';
  reggform:any;
  user:any;
  pOrders:PartOrder[]=[];

  constructor(
    private titleService:Title,
    private authService:AuthService,
    private router:Router,
    private orderService:OrderService,
    private cartService:CartService
  ){
    titleService.setTitle("Pc Store:Order Page")

    //reg form
    this.reggform=new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      phone:new FormControl('',[
        Validators.required,
        Validators.pattern(/^(\+380|0)\d{9}$/)
      ]),
      surname:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      firstname:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      address:new FormControl('',[
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      father:new FormControl('',[
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ])
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('token')!==null){
      this.authService.getUser().subscribe((result) => {
        this.user = result;
        this.reggform.patchValue({
          email: this.user.email,
          phone: this.user.phone,
          surname: this.user.lastName,
          firstname: this.user.firstName,
          father: this.user.father
        });
      });
    }
    this.pOrders=this.cartService.getcartItemList();
  }

  getProductsSum(){
    return this.cartService.getTotalPrice();
  }

  onAddQuantity(index:number){
    this.cartService.addtoCart(this.pOrders[index].product)
  }

  onRemoveQuantity(index:number){
    this.cartService.removeCartItem(index);
  }

  onSubmit(){
    this.orderService.postOrder(this.reggform.get('email').value,this.reggform.get('address').value,this.pOrders).subscribe(
      (res: any) => {
          window.alert("Замовлення відправлено!")
          this.cartService.clearCart();
          this.pOrders=this.cartService.cartItemList;
          this.errorMessage = res;
      }
    );
  }
}
