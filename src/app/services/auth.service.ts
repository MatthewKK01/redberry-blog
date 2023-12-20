import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://api.blog.redberryinternship.ge/api/login"

  constructor(private http: HttpClient) { }
  private responseStatusSubject = new BehaviorSubject<number>(null);
  responseStatus$ = this.responseStatusSubject.asObservable();

  setResponseStatus(status: number) {
    this.responseStatusSubject.next(status);
  }

  postUser(email: string, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url, { email }, { headers, observe: "response" })
  }


}
