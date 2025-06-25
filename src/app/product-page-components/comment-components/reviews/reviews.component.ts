import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentDTO } from 'src/app/DTOs/CommentDTOs/CommentDTO.interface';
import { ReviewDTO } from 'src/app/DTOs/CommentDTOs/ReviewDTO.interface';
import { FullProductDTO } from 'src/app/DTOs/ProductDTOs/FullProductDTO.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input() product!: FullProductDTO;

  userId: string | null = null;
  userAuthenticated: boolean = false;
  isLoading: boolean = false;

  reviewForm: FormGroup;

  createErrorMessage: string = '';
  editErrorMessage: string = '';
  deleteErrorMessages: { [key: number]: string } = {};

  editingReviewId: number | null = null;
  editingContent: string = '';
  editingRating: number = 0;

  constructor(private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.reviewForm = this.fb.group({
      content: ['', [Validators.minLength(0), Validators.maxLength(500)]],
      rating: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: () => {
        this.userAuthenticated = true;
        this.userId = decodeURIComponent(this.cookieService.getCookieByName("userId"));
      },
      error: () => { }
    });
  }

  submitReview() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;
    this.createErrorMessage = '';

    this.commentService.createReview(this.product.id, this.reviewForm.get('content')?.value, this.reviewForm.get('rating')?.value).subscribe({
      next: (res: ReviewDTO) => {
        this.product.reviews.unshift(res);
        this.reviewForm.reset();
        this.isLoading = false;
        this.createErrorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.createErrorMessage = 'Ваш коментар є неприйнятним!';
          this.isLoading = false;
        }
        else {
          this.createErrorMessage = 'Вибачте, на даний момент ми не можемо прийняти ваш запит!';
          this.isLoading = false;
        }
      }
    });
  }

  get contentLength(): number {
    return this.reviewForm.get('content')?.value?.length || 0;
  }

  startEdit(review: any) {
    this.editingReviewId = review.id;
    this.editingContent = review.content;
    this.editingRating = review.rating;
  }

  cancelEdit() {
    this.editingReviewId = null;
    this.editingContent = '';
    this.editingRating = 0;
  }

  saveEditedReview(reviewId: number) {
    this.isLoading = true;
    this.editErrorMessage = '';

    this.commentService.updateComment(reviewId, this.editingContent).subscribe({
      next: (res: CommentDTO) => {
        let index = this.product.reviews.findIndex(x => x.id === reviewId);
        this.product.reviews[index].content = res.content
        this.product.reviews[index].dateModified = res.dateModified
        this.editErrorMessage = '';
        this.cancelEdit();
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.editErrorMessage = 'Your comment is abusive!';
          this.isLoading = false;
        }
        else {
          this.editErrorMessage = 'Error deleting the review. Please try again.';
          this.isLoading = false;
        }
      }
    });
  }

  deleteReview(reviewId: number) {
    if (!confirm('Are you sure, you want to delete this review?')) return;

    this.isLoading = true;
    this.deleteErrorMessages[reviewId] = '';

    this.commentService.deleteComment(reviewId).subscribe({
      next: () => {
        let index = this.product.reviews.findIndex(x => x.id === reviewId);
        this.product.reviews.splice(index, 1);
        this.deleteErrorMessages[reviewId] = '';
        this.isLoading = false;
      },
      error: () => {
        this.deleteErrorMessages[reviewId] = 'Sorry? but we are unable to resolve your request!';
        this.isLoading = false;
      }
    });
  }
}
