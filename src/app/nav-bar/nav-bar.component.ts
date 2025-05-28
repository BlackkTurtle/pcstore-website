import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { TypesService } from '../services/types.service';
import { CategoryIdNameDTO } from '../DTOs/CategoryDTOs/categoryIdNameDTO.interface';
import { GetBrandDTO } from '../DTOs/BrandDTOs/getBrandDTO.interface';
import { ProductIdNameDTO } from '../DTOs/ProductDTOs/ProductIdNameDTO.interface';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchValue:string="";
  types: CategoryIdNameDTO[] = [];
  brands: GetBrandDTO[] = [];
  products: ProductIdNameDTO[]=[];
  cartQuantity:number=0;

  constructor(
    private cartService:CartService,
    private navbarService: NavbarService
  ){}

  ngOnInit(): void {
      this.cartQuantity=this.cartService.getCount()
  }

  inputChange(){
    if(this.searchValue.length>=2){
      this.navbarService.getSearchBarResultByNameLike(this.searchValue).subscribe((result) => {
        this.types = result.categorys;
        this.brands = result.brands;
        this.products = result.products;
      });
    }else{
      this.types=[];
      this.brands=[];
      this.products=[];
    }
  }
}
