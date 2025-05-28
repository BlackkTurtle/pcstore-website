import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { ProductWithRating } from '../DTOs/ProductWithRatingDTO.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(
    private titleService:Title,
    private productService:ProductService
  ){
    titleService.setTitle("Pc Store")
  }

  new2Products:ProductWithRating[]=[]
  seenProducts:ProductWithRating[]=[]

  ngOnInit(): void {
    this.productService.getNew2Products().subscribe((result) => {
      this.new2Products = result;
      console.log(this.new2Products)
    });

    if (localStorage.getItem("seenInts")!=null){

      var productIds=this.getItem<number[]>("seenInts");
      this.productService.getMultipleProductsByIds(productIds).subscribe(
        (response) => {
          this.seenProducts = response;
          console.log(this.seenProducts)
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
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

}
