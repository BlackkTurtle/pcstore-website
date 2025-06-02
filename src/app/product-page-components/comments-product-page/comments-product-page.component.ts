import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullProductDTO } from 'src/app/DTOs/ProductDTOs/FullProductDTO.interface';

@Component({
  selector: 'app-comments-product-page',
  templateUrl: './comments-product-page.component.html',
  styleUrls: ['./comments-product-page.component.css']
})
export class CommentsProductPageComponent {
  @Input() product!: FullProductDTO;

  activeTab: string = 'reviews';

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      content: ['', [Validators.minLength(0), Validators.maxLength(500)]],
      rating: [0, [Validators.required, Validators.min(1)]],
    });
  }

    submitReview(): void {
    if (this.reviewForm.valid) {
      const review = this.reviewForm.value;
      review.productId = this.product.id;
      console.log('Submitted review:', review);
      // Call your service here to save review
      this.reviewForm.reset();
    }
  }

  get contentLength(): number {
    return this.reviewForm.get('content')?.value?.length || 0;
  }
}
