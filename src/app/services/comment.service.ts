import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../interfaces/comment.interface';
import { ReviewDTO } from '../DTOs/CommentDTOs/ReviewDTO.interface';
import { CommentDTO } from '../DTOs/CommentDTOs/CommentDTO.interface';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) { }

  getcommentsByArticle(string: string | null): Observable<Comments[]> {
    return this.http.get<Comments[]>(
      `http://localhost:8002/api/EFComment/${string}`
    );
  }

  createReview(productId: number, content: string, rating: number): Observable<ReviewDTO> {
    let body = {
      productId: productId,
      content: content,
      rating: rating
    }

    return this.http.post<ReviewDTO>(`http://localhost:8002/api/Comment/CreateReview`, body)
  }

  createComment(productId: number, content: string): Observable<CommentDTO> {
    let body = {
      productId: productId,
      content: content,
    }

    return this.http.post<CommentDTO>(`http://localhost:8002/api/Comment/CreateComment`, body)
  }

  createCommentResponse(productId: number, commentId: number, content: string): Observable<CommentDTO> {
    let body = {
      productId: productId,
      commentId: commentId,
      content: content,
    }

    return this.http.post<CommentDTO>(`http://localhost:8002/api/Comment/CreateCommentResponse`, body)
  }

  updateComment(id: number, content: string): Observable<CommentDTO> {
    let body = {
      commentId: id,
      content: content
    }

    return this.http.put<CommentDTO>(`http://localhost:8002/api/Comment/UpdateComment`, body)
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(
      `http://localhost:8002/api/Comment/DeleteComment/${id}`
    );
  }
}