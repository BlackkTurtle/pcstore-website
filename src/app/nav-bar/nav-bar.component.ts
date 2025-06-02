import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { TypesService } from '../services/types.service';
import { CategoryIdNameDTO } from '../DTOs/CategoryDTOs/categoryIdNameDTO.interface';
import { GetBrandDTO } from '../DTOs/BrandDTOs/getBrandDTO.interface';
import { ProductIdNameDTO } from '../DTOs/ProductDTOs/ProductIdNameDTO.interface';
import { NavbarService } from '../services/navbar.service';
import { CatalogService } from '../services/catalog.service';

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
    private navbarService: NavbarService,
    private catalogService: CatalogService
  ){}

  ngOnInit(): void {
      this.cartQuantity=this.cartService.getCount()
  }

  searchBarEnter():void{
    this.catalogService.searchStr = this.searchValue;
    this.catalogService.categoryId = 0;
    this.catalogService.characteristicId = 0;
    this.catalogService.productCaharacteristicName = "";
  }
}
