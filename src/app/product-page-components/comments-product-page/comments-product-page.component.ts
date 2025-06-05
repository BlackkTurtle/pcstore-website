import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullProductDTO } from 'src/app/DTOs/ProductDTOs/FullProductDTO.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-comments-product-page',
  templateUrl: './comments-product-page.component.html',
  styleUrls: ['./comments-product-page.component.css']
})
export class CommentsProductPageComponent{
  @Input() product!: FullProductDTO;

  activeTab: string = 'reviews';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
