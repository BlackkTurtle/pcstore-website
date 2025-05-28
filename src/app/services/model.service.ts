import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ModelService {
    constructor(private http: HttpClient) { }

    uploadImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
    
        return this.http.post<any>("http://127.0.0.1:8000/upload-image/", formData).pipe(
          catchError(this.handleError)
        );
      }
    
      private handleError(error: HttpErrorResponse) {
        return throwError(error.message || 'Server error');
      }
}