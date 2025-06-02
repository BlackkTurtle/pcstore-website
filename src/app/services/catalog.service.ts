import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  public searchStr:string = "";
  public categoryId:number = 0;
  public characteristicId:number = 0;
  public productCaharacteristicName:string = "";
  constructor() { }
}
