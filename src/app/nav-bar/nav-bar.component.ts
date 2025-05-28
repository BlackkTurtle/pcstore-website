import { Component, OnInit } from '@angular/core';
import { Brand } from '../interfaces/brand.interface';
import { Product } from '../interfaces/product.interface';
import { Types } from '../interfaces/types.interface';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchValue:string="";
  types: Types[] = [];
  brands: Brand[] = [];
  products: Product[]=[];
  cartQuantity:number=0;

  constructor(
    private typesService:TypesService,
    private brandService:BrandService,
    private productService:ProductService,
    private cartService:CartService
  ){}

  ngOnInit(): void {
      this.cartQuantity=this.cartService.getCount()
  }

  inputChange(){
    if(this.searchValue.length>=2){
      this.typesService.getTypesByNameLike(this.searchValue).subscribe((result) => {
        this.types = result.slice(0,2);
      });
      this.brandService.getBrandsByNameLike(this.searchValue).subscribe((result) => {
        this.brands = result.slice(0,2);
      });
      this.productService.getProductsByNameLike(this.searchValue).subscribe((result) => {
        this.products = result.slice(0,3);
      });
    }else{
      this.types=[];
      this.brands=[];
      this.products=[];
    }
  }
}
