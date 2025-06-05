import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommentDTO } from 'src/app/DTOs/CommentDTOs/CommentDTO.interface';
import { FullProductDTO } from 'src/app/DTOs/ProductDTOs/FullProductDTO.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-comments-and-responses',
  templateUrl: './comments-and-responses.component.html',
  styleUrls: ['./comments-and-responses.component.css']
})
export class CommentsAndResponsesComponent {
  @Input() product!: FullProductDTO;

  userId: string | null = null;
  userAuthenticated: boolean = false;

  isCreatingComment$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isUpdatingComment$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isDeletingComment$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSubmittingReply$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  commentForm: FormGroup;
  replyForms: { [key: number]: FormGroup } = {};

  createErrorMessage: string = '';
  editErrorMessages: { [key: number]: string } = {};  
  deleteErrorMessages: { [key: number]: string } = {}; 
  replyErrorMessages: { [key: number]: string } = {};  

  editingCommentId: number | null = null; 
  editingContent: string = '';         
  replyingToCommentId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthService,
    private commentService: CommentService
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe({
      next: () => {
        this.userAuthenticated = true;
        this.userId = decodeURIComponent(this.cookieService.getCookieByName("userId") || '');
      },
      error: () => {
        this.userAuthenticated = false;
        this.userId = null;
      }
    });
  }

  get contentLength(): number {
    return this.commentForm.get('content')?.value?.length || 0;
  }

  submitComment() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.isCreatingComment$.next(true);
    this.createErrorMessage = '';    

    this.commentService.createComment(this.product.id, this.commentForm.get('content')?.value).subscribe({
      next: (res: CommentDTO) => {
        this.product.comments.unshift(res);
        this.commentForm.reset();
        this.isCreatingComment$.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.createErrorMessage = err.status === 400
          ? 'Ваш коментар є неприйнятним!'
          : 'Сталася помилка при створенні коментаря. Будь ласка, спробуйте ще раз.';
        this.isCreatingComment$.next(false);
      }
    });
  }

  startEdit(comment: CommentDTO) {
    if (this.replyingToCommentId !== null) {
      this.cancelReply(this.replyingToCommentId);
    }
    this.editingCommentId = comment.id;
    this.editingContent = comment.content;

    if (this.editErrorMessages[comment.id]) {
      delete this.editErrorMessages[comment.id];
    }
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editingContent = '';

    for (const key in this.editErrorMessages) {
      if (Object.prototype.hasOwnProperty.call(this.editErrorMessages, key)) {
        delete this.editErrorMessages[key];
      }
    }
  }

  saveEditedComment(commentId: number) {
    if (!this.editingContent.trim() || this.editingContent.length > 500) {
      this.editErrorMessages[commentId] = 'Коментар не може бути порожнім і повинен бути менше 500 символів.';
      return;
    }

    this.isUpdatingComment$.next(true);
    this.editErrorMessages[commentId] = '';

    this.commentService.updateComment(commentId, this.editingContent).subscribe({
      next: (res: CommentDTO) => {
        const updateInComments = (comments: CommentDTO[]) => {
          for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === commentId) {
              comments[i].content = res.content;
              comments[i].dateModified = res.dateModified;
              return true;
            }
            if (comments[i].children && comments[i].children.length > 0) {
              if (updateInComments(comments[i].children)) {
                return true;
              }
            }
          }
          return false;
        };

        updateInComments(this.product.comments);

        this.cancelEdit();
        this.isUpdatingComment$.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.editErrorMessages[commentId] = err.status === 400
          ? 'Ваш коментар є неприйнятним!'
          : 'Сталася помилка при оновленні коментаря. Будь ласка, спробуйте ще раз.';
        this.isUpdatingComment$.next(false);
      }
    });
  }

  deleteComment(commentId: number) {
    if (!confirm('Ви впевнені, що хочете видалити цей коментар? Цю дію не можна буде скасувати.')) {
      return;
    }

    this.isDeletingComment$.next(true);
    this.deleteErrorMessages[commentId] = ''; 

    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        const removeComment = (comments: CommentDTO[], idToRemove: number): CommentDTO[] => {
          return comments.filter(comment => {
            if (comment.id === idToRemove) {
              return false;
            }
            if (comment.children && comment.children.length > 0) {
              comment.children = removeComment(comment.children, idToRemove); 
            }
            return true;
          });
        };

        this.product.comments = removeComment(this.product.comments, commentId);
        this.isDeletingComment$.next(false);
      },
      error: () => {
        this.deleteErrorMessages[commentId] = 'Помилка при видаленні коментаря. Будь ласка, спробуйте ще раз.';
        this.isDeletingComment$.next(false); 
      }
    });
  }

  startReply(commentId: number) {
    if (this.editingCommentId !== null) {
      this.cancelEdit();
    }

    this.replyingToCommentId = commentId;
    this.replyForms[commentId] = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
    if (this.replyErrorMessages[commentId]) {
      delete this.replyErrorMessages[commentId];
    }
  }
  cancelReply(commentId: number) {
    delete this.replyForms[commentId]; 
    this.replyingToCommentId = null;   
    if (this.replyErrorMessages[commentId]) {
      delete this.replyErrorMessages[commentId];
    }
  }

  submitReply(parentId: number) {
    const replyForm = this.replyForms[parentId];
    if (!replyForm || replyForm.invalid) {
      replyForm?.markAllAsTouched(); 
      return;
    }

    this.isSubmittingReply$.next(true); 
    this.replyErrorMessages[parentId] = ''; 

    this.commentService.createCommentResponse(this.product.id, parentId, replyForm.get('content')?.value).subscribe({
      next: (res: CommentDTO) => {
        const parentComment = this.product.comments.find(c => c.id === parentId);
        if (parentComment) {
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(res); 
        }

        this.cancelReply(parentId); 
        this.isSubmittingReply$.next(false); 
      },
      error: (err: HttpErrorResponse) => {
        this.replyErrorMessages[parentId] = err.status === 400
          ? 'Ваша відповідь є неприйнятною!'
          : 'Помилка при створенні відповіді. Будь ласка, спробуйте ще раз.';
        this.isSubmittingReply$.next(false);
      }
    });
  }
}