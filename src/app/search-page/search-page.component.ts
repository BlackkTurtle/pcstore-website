import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Brand } from '../interfaces/brand.interface';
import { Product } from '../interfaces/product.interface';
import { Types } from '../interfaces/types.interface';
import { BrandService } from '../services/brand.service';
import { ProductService } from '../services/product.service';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  products:Product[]=[];
  selectedSortOption:any;
  sortOptions:string[]=[
    'Від дешевих до дорогих',
    'Від дорогих до дешевих',
    'Від А до Я',
    'Від Я до А'
  ];
  minPrice:number=0;
  maxPrice:number=0;

  constructor(
    private titleService:Title,
    private typesService:TypesService,
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService
  ){
    titleService.setTitle("Pc Store:Search Page")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value=>{
      //this.setProductsOnInit(value);
    });
  }

  setPrices(){
    this.minPrice=this.products.reduce((prev, current) => (prev.price < current.price) ? prev : current).price;
    this.maxPrice=this.products.reduce((prev, current) => (prev.price > current.price) ? prev : current).price;
  }

  sortTypeChange(){
    if(this.selectedSortOption==this.sortOptions[0]){
      this.products=this.products.sort((a,b) => a.price - b.price);
    }else 
    if(this.selectedSortOption==this.sortOptions[1]){
      this.products=this.products.sort((a,b) => b.price- a.price);
    }
  }
}
