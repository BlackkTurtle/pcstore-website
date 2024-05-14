import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Brand } from '../interfaces/brand.interface';
import { Types } from '../interfaces/types.interface';
import { BrandService } from '../services/brand.service';
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

  constructor(
    private titleService:Title,
    private typesService:TypesService,
    private brandService:BrandService
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
