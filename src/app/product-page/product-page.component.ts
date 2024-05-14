import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product:Product={
    article:4,
    name:"page",
    picture:"https://miro.medium.com/v2/resize:fit:800/1*bc9pmTiyKR0WNPka2w3e0Q.png",
    type:5,
    price:1000,
    productInfo:"headphone",
    brandId:15,
    availability:true,
  }
}
