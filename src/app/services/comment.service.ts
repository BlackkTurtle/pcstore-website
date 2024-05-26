import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../interfaces/comment.interface';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  getcommentsByArticle(string:string|null): Observable<Comments[]> {
    return this.http.get<Comments[]>(
      `http://localhost:8002/api/EFComment/${string}`
    );
  }
}