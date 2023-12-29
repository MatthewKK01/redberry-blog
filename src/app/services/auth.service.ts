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

  private token: string = '2c47650fc13dd3b28eb40b6d111e7f5d9f5b1a880482fd9b1f6818029cb54c6a';
  setResponseStatus(status: number) {
    this.responseStatusSubject.next(status);
  }

  postUser(email: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url, { email }, { headers, observe: "response" })
  }


}
