import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Order } from '../interfaces/order.interface';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { PartOrder } from "../interfaces/partorder.interface";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user:any;
  orders:Order[]=[]
  porders:PartOrder[]=[]

  constructor(
    private titleService:Title,
    private router:Router,
    private authService:AuthService,
    private orderService:OrderService
  ){
    titleService.setTitle("Pc Store:User Page")
  }

  ngOnInit(): void {
      if(localStorage.getItem('token')===null){
        this.router.navigate(['/authpage']);
      }

      this.authService.getUser().subscribe((result) => {
        this.user = result;
      });

      this.orderService.getOrdersByUser().subscribe((result) => {
        console.log(result)
        this.orders = result;
        console.log(this.orders)
      });
  }

  exitUser(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
