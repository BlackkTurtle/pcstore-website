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

  searchTypes:string="";
  types: Types[] = [];
  selectedTypes:Types[]=[];
  searchBrand:string="";
  brands:Brand[]=[];
  selectedBrands:Brand[]=[];

  products:Product[]=[];
  selectedSortOption:any;
  sortOptions:string[]=[
    'Від дешевих до дорогих',
    'Від дорогих до дешевих'
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
    this.typesService.getTypes().subscribe((result) => {
      this.types = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.activatedRoute.paramMap.subscribe(value=>{
      this.setProductsOnInit(value);
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

  setProductsByTypesAndBrands(){
    this.productService.getProductsByTypesAndBrands(this.selectedTypes,this.selectedBrands,this.minPrice,this.maxPrice).subscribe((result) => {
      console.log(result);
      this.products = result;
    });
  }

  setProductsOnInit(value:ParamMap){
    let searchtype=value.get('searchmethod');

    if(searchtype=="1"){
      let searchname=value.get('searchstr')
      this.productService.getProductsByNameLike(searchname).subscribe((result) => {
        this.products = result;
        this.setPrices()
      });
    }else if(searchtype=="2"){
      let searchname=value.get('brandid')
      this.productService.getProductsByBrandId(searchname).subscribe((result) => {
        this.products = result;
        this.setPrices()
      });
    }else if(searchtype=="3"){
      let searchname=value.get('typeid')
      this.productService.getProductsByTypeId(searchname).subscribe((result) => {
        this.products = result;
        this.setPrices()
      });
    }else{
      this.productService.getProducts().subscribe((result) => {
        this.products = result;
        this.setPrices()
      });
    }
  }

  //Types methods
  sortTypes = (a: Types, b: Types): number => {
    if (a.typeName < b.typeName) return -1;
    if (a.typeName === b.typeName) return 0; 
    return 1;
  }

  typesinputChange(){
    if (this.searchTypes.length==0){
      this.typesService.getTypes().subscribe((result) => {
        result = result.filter( ( el ) => !this.selectedTypes.includes( el ) );
        this.types = result;
      });
    }else{
      this.typesService.getTypesByNameLike(this.searchTypes).subscribe((result) => {
        result = result.filter( ( el ) => !this.selectedTypes.includes( el ) );
        this.types = result;
      });
    }
  }

  typesChangedCheckbox(index:number){
    this.selectedTypes.push(this.types[index])
    this.types.splice(index,1)
  }

  selectedtypesChangedCheckbox(index:number){
    this.types.push(this.selectedTypes[index])
    this.selectedTypes.splice(index,1)
  }

  //Brand Methods
  sortBrands = (a: Brand, b: Brand): number => {
    if (a.brandName < b.brandName) return -1;
    if (a.brandName === b.brandName) return 0; 
    return 1;
  }

  brandsinputChange(){
    if (this.searchBrand.length==0){
      this.brandService.getBrands().subscribe((result) => {
        result = result.filter( ( el ) => !this.selectedBrands.includes( el ) );
        this.brands = result;
      });
    }else{
      this.brandService.getBrandsByNameLike(this.searchBrand).subscribe((result) => {
        result = result.filter( ( el ) => !this.selectedBrands.includes( el ) );
        this.brands = result;
      });
    }
  }

  brandsChangedCheckbox(index:number){
    this.selectedBrands.push(this.brands[index])
    this.brands.splice(index,1)
  }

  selectedbrandsChangedCheckbox(index:number){
    this.brands.push(this.selectedBrands[index])
    this.selectedBrands.splice(index,1)
  }
}
