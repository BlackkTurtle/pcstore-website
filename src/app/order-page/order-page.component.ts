import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PartOrder } from '../interfaces/partorder.interface';
import { Product } from '../interfaces/product.interface';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { CartItemDTO } from '../DTOs/OtherDTOs/CartItemDTO.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  errorMessage: string = '';
  reggform: any;
  user: any;
  pOrders: CartItemDTO[] = [];

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {
    titleService.setTitle("Pc Store:Order Page")

    //reg form
    this.reggform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+380|0)\d{9}$/)
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ]),
      father: new FormControl('', [
        Validators.pattern(
          /^[A-Za-z]+$/
        )
      ])
    });
  }

  ngOnInit(): void {
    this.pOrders = this.cartService.cartItemList;
  }

  getProductsSum() {
    return this.cartService.getTotalPrice();
  }

  onAddQuantity(index: number) {
    this.cartService.addCartItem(index);
  }

  onRemoveQuantity(index: number) {
    this.cartService.removeCartItem(index);
  }

  onSubmit() {
    window.alert("Order submited!")
    this.cartService.clearCart();
  }
}
