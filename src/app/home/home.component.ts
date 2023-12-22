import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { BlogService } from '../services/blog.service';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  author: string;
  categories: Category[];
}

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(public categoriesService: CategoryService, public blogService: BlogService, public auth: AuthService, public router: Router) { }

  public categories: Category[] = [];
  public isLoggedIn: boolean = false




  public posts: BlogPost[];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      data => console.log('Success!', this.categories = data.data),
      error => console.error('Error:', error),
    )

    this.auth.responseStatus$.subscribe(
      {
        next: (status) => {
          if (status === 204) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        }
      }
    )
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res.data
      }
    })

  }

  navigate() {
    this.router.navigate(['newblog']); // Navigate to the specified route (e.g., home)
  }


}
