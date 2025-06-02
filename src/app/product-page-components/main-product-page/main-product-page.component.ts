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
    this.product.description = `  Використовувати при t +10°С - +35°С, ϕ 20%-75% оточуючого середовища.
     Зберігати при t +5°С - +35°С, ϕ 20%-75% в захищеному від дітей місці.
Товари не є харчовими продуктами, та за нормальних умов використання не є шкідливими для здоров'я.
Строк служби рівний гарантійному строку. По закінченню строку служби передати службі утилізації.
   Країна виробництва (місцезнаходження виробника) вказана на товарі в полі Made In або схожим чином у спосіб передбаченим виробником.
Дата виробництва конкретної одиниці зазначена на коробці та/або на товарі чи в його ПЗ, в полі manufacturing date або схожим чином (в тому числі й у вигляді кодування дати виробництва в серійний номер продукту) у спосіб передбаченим виробником.
  Підприємство щодо прийняття претензій та запиту додаткової інформації:
• ТОВ "ТЕЛЕМАРТ"
• м.Дніпро пров.Біологічний 2А оф.16 Тeл:+380674000880
• ел.пошта:sales@telemart.ua`;
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
