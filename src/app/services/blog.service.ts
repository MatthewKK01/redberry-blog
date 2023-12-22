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
  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';

  getBlogs() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(this.url, { headers })
  }

  getBlogPostById(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
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
