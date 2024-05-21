import { Component } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  product:Product={
    article:4,
    name:"lorem ipsum  sdkflkvbjdgk;bslfvs jd fljshl  sjlh ",
    picture:"https://miro.medium.com/v2/resize:fit:800/1*bc9pmTiyKR0WNPka2w3e0Q.png",
    type:5,
    price:1000,
    productInfo:"headphone",
    brandId:15,
    availability:true,
  }
  comment:Comment={
    commentId:3,
    Article:5,
    Stars:2,
    CommentDate:'data',
    UserId:'user',
    Comment1:'text',
  }
}
