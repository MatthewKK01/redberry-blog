import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://api.blog.redberryinternship.ge/api/login"
  constructor(private http: HttpClient) { }

  postUser(email: string, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.url, { email }, { headers })
  }

}
