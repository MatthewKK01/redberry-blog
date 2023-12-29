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

  private token: string = 'fc88a355ca72a4f71fcddd31dfe94cc7ef0bb851ba8cbc80a93340ae1a91f273';
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
