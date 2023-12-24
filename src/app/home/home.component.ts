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
  email?: string;
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




  public posts: BlogPost[];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      data => console.log('Success!', this.categories = data.data),
      error => console.error('Error:', error),
    )


    this.blogService.getBlogs().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res.data
      }
    })

  }




}
