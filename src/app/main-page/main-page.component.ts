import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { ProductWithRating } from '../DTOs/ProductDTOs/ProductWithRatingDTO.interface';
import { AdvertisementService } from '../services/advertisement.service';
import { AdvertisementDTO } from '../DTOs/AdvertisementDTOs/advertisementDTO.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(
    private titleService:Title,
    private productService:ProductService,
    private advertisementService:AdvertisementService
  ){
    titleService.setTitle("Pc Store")
  }

  //Advertisement div
  advertisements: AdvertisementDTO[] = [];
  currentIndex: number = 0;

  getAdvertisements(): void {
    this.advertisementService.getOrderedAdvertisements().subscribe((result) => {
      this.advertisements = result;
    });
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.advertisements.length) % this.advertisements.length;
  }

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.advertisements.length;
  }
  //

  new2Products:ProductWithRating[]=[]
  seenProducts:ProductWithRating[]=[]

  ngOnInit(): void {
    this.getAdvertisements();
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
          console.log(this.seenProducts[0].photoLink)
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
