import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Types } from '../interfaces/types.interface';
import { TypesService } from '../services/types.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  searchTypes:string="";
  types: Types[] = [];
  selectedTypes:Types[]=[];

  constructor(
    private titleService:Title,
    private typesService:TypesService
  ){
    titleService.setTitle("Pc Store:Search Page")
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

}
