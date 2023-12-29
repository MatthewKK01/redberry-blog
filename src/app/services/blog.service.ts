import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  private url: string = "https://api.blog.redberryinternship.ge/api/blogs";
  blogApi: string = "https://api.blog.redberryinternship.ge/api"
  postUrl: string = "https://api.blog.redberryinternship.ge/api/blogs"
  private token: string = '2c47650fc13dd3b28eb40b6d111e7f5d9f5b1a880482fd9b1f6818029cb54c6a';

  getBlogs() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url, { headers })
  }

  getBlogPostById(id: number,): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.blogApi}/blogs/${id}`;
    return this.http.get(url, { headers });
  }

  sendPost(blogDetails) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(this.url, blogDetails, { headers });
  }
}
