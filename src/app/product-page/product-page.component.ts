import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comments } from '../interfaces/comment.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product:any;
  products:Product[]=[];
  comments:Comments[]=[];
  form:any;
  rating:any;

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private commentService:CommentService,
    private fb: FormBuilder,
    private cartService:CartService
  ){
    this.rating = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  addSeenProduct(){
    if (localStorage.getItem("seenInts")==null){
      var ints=[]
      ints.push(this.activatedRoute.snapshot.paramMap.get('id'))
      this.setItem("seenInts",ints)
    }else{
      var ints=this.getItem<any[]>("seenInts");
      if (ints.includes(this.activatedRoute.snapshot.paramMap.get('id'))) {

        ints = ints.filter(item => item !== this.activatedRoute.snapshot.paramMap.get('id'));
        
        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'));
        this.setItem("seenInts",ints)
      }
      else if (ints.length==5){
        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'))
        ints=ints.slice(0,5)
        this.setItem("seenInts",ints)
      }
      else{
        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'))
        this.setItem("seenInts",ints)
      }
    }
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData) as T;
    }
    return [] as T
  }

  ngOnInit(): void {
    this.addSeenProduct()
    let id=this.activatedRoute.snapshot.paramMap.get('id')
    this.productService.getProductsById(id).subscribe((result) => {
      this.product = result;
    });
    this.commentService.getcommentsByArticle(id).subscribe((result) => {
      this.comments = result;
      let sum = 0;
      for (let i = 0; i < this.comments.length; i++) {
        sum += this.comments[i].stars;
      }
      this.rating = this.comments.length > 0 ? sum / this.comments.length : 0;
    });
  }

  addProductToCart(){
    this.cartService.addtoCart(this.product)
    window.alert("Added item to the cart!")
  }
}
