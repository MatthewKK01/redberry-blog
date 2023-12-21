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

  getBlogs(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
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
}
