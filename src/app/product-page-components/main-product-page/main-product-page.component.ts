import { Component, Input } from '@angular/core';
import { FullProductDTO } from 'src/app/DTOs/ProductDTOs/FullProductDTO.interface';
import { CartService } from 'src/app/services/cart.service';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-main-product-page',
  templateUrl: './main-product-page.component.html',
  styleUrls: ['./main-product-page.component.css']
})
export class MainProductPageComponent {
  @Input() product!: FullProductDTO;

  constructor(private catalogService: CatalogService,
    private cartService:CartService
  ) {

  }

  selectedImage!: string;

  ngOnInit(): void {
    this.selectedImage = this.product.images?.[0] || '';
    this.product.description = `Use at temperatures from +10°C to +35°C, with ambient humidity from 20% to 75%.
Store at temperatures from +5°C to +35°C, with ambient humidity from 20% to 75%, in a place inaccessible to children.
The products are not food items and, under normal usage conditions, are not harmful to health.
The service life is equal to the warranty period. After the service life ends, transfer the product to a recycling service.
The country of manufacture (manufacturer’s location) is indicated on the product in the “Made In” field or in a similar way as specified by the manufacturer.
The manufacturing date of the specific unit is indicated on the box and/or on the product or in its software, in the “manufacturing date” field or in a similar way (including encoded as part of the serial number) as specified by the manufacturer.`;
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  addToCart(): void {
    this.cartService.addtoCart(this.product.id);
  }

  categoryRouterClick(): void {
    this.catalogService.searchStr = "";
    this.catalogService.categoryId = this.product.categoryIdNameDTO.id;
    this.catalogService.characteristicId = 0;
    this.catalogService.productCaharacteristicName = "";
  }

  characteristicRouterClick(id:number, name:string): void {
    this.catalogService.searchStr = "";
    this.catalogService.categoryId = this.product.categoryIdNameDTO.id;
    this.catalogService.characteristicId = id;
    this.catalogService.productCaharacteristicName = name;
  }
}
