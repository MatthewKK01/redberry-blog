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

  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';
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
