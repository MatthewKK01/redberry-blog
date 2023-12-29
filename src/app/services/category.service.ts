import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private categoryUrl = "https://api.blog.redberryinternship.ge/api/categories"
  private token: string = 'fc88a355ca72a4f71fcddd31dfe94cc7ef0bb851ba8cbc80a93340ae1a91f273';


  getCategories() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.categoryUrl, { headers })
  }
}
