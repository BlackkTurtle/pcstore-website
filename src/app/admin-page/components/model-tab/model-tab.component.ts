import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentReviewDTO } from 'src/app/DTOs/CommentDTOs/commentReviewDTO.interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-model-tab',
  templateUrl: './model-tab.component.html',
  styleUrls: ['./model-tab.component.css']
})
export class ModelTabComponent implements OnInit {
  comments: CommentReviewDTO[] = [];

  constructor(private router: Router,
    private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.commentService.getCommentReviews().subscribe({
      next: (res: any) => {
        this.comments = res;
      },
      error: () => {
        this.comments = [];
      }
    });
  }

  updateValid(commentId: number, valid: boolean): void {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.valid = valid; // update UI immediately
    }
  }

  goToProduct(productId: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/productpage`, productId])
    );
    window.open(url, '_blank');
  }

  checkOnBottomButton(): boolean {
    return this.comments.some(comment => comment.valid !== true && comment.valid !== false);
  }

  onBottomButtonClick(): void {
    this.commentService.updateCommentStatuses(this.comments).subscribe({
      next: (res: any) => {
        this.ngOnInit();
      },
      error: () => {
        this.ngOnInit();
      }
    });
  }
}
