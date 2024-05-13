import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {

  constructor(
    private titleService:Title
  ){
    titleService.setTitle("Pc Store:Order Page")
  }
}
