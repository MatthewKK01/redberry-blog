import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private categoryUrl = "https://api.blog.redberryinternship.ge/api/categories"
  private token: string = '2c47650fc13dd3b28eb40b6d111e7f5d9f5b1a880482fd9b1f6818029cb54c6a';

  getCategories() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.categoryUrl, { headers })
  }
}
