import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  logInUser(email: string, password: string): Observable<any> {
    const obj = {
      email: email,
      password: password
    };

    return this.http.post(`http://localhost:8001/api/User/login`, obj).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return of({ error: true, message: errorMessage });
  }

  registerUser(email: string, firstName: string, lastName: string, father: string, phone: string, password: string, confirmPassword: string): Observable<any> {
    const obj = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      father: father,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword
    };

    return this.http.post(`http://localhost:8001/api/User/register`, obj).pipe(
      catchError(this.handleError)
    );
  }

  getUser(): Observable<any> {

    return this.http.get(`http://localhost:8001/api/User/`).pipe(
      catchError(this.handleError)
    );
  }

  checkAuth(): Observable<any> {

    return this.http.get(`http://localhost:8001/api/User/check-auth`);
  }

  checkAdmin(): Observable<any> {

    return this.http.get(`http://localhost:8001/api/User/check-admin`);
  }

  logout(): Observable<any> {

    return this.http.post(`http://localhost:8001/api/User/logout`, null);
  }
}