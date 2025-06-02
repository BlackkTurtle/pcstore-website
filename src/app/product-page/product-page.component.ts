import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comments } from '../interfaces/comment.interface';
import { CartService } from '../services/cart.service';
import { FullProductDTO } from '../DTOs/ProductDTOs/FullProductDTO.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: FullProductDTO;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  addSeenProduct() {
    if (localStorage.getItem("seenInts") == null) {
      var ints = []
      ints.push(this.activatedRoute.snapshot.paramMap.get('id'))
      this.setItem("seenInts", ints)
    } else {
      var ints = this.getItem<any[]>("seenInts");
      if (ints.includes(this.activatedRoute.snapshot.paramMap.get('id'))) {

        ints = ints.filter(item => item !== this.activatedRoute.snapshot.paramMap.get('id'));

        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'));
        this.setItem("seenInts", ints)
      }
      else if (ints.length == 5) {
        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'))
        ints = ints.slice(0, 5)
        this.setItem("seenInts", ints)
      }
      else {
        ints.unshift(this.activatedRoute.snapshot.paramMap.get('id'))
        this.setItem("seenInts", ints)
      }
    }
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData) as T;
    }
    return [] as T
  }

  ngOnInit(): void {
    this.addSeenProduct()
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.productService.getFullProduct(id).subscribe((result) => {
      this.product = result;
    });
  }

  activeTab: string = 'main';

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
