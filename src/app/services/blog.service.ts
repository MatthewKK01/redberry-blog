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
  private token: string = 'fc88a355ca72a4f71fcddd31dfe94cc7ef0bb851ba8cbc80a93340ae1a91f273';

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
