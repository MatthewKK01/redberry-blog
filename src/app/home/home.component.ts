import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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



  constructor(
    public categoriesService: CategoryService,
    public blogService: BlogService,
    public auth: AuthService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  public categories: Category[] = [];
  public posts: BlogPost[];

  selectedIndex: number | null = null;
  selectedIndices: any[] = [];
  isSelected(index: number): boolean {
    return this.selectedIndices.includes(index);
  }
  toggleBorder(index: number): void {
    const indexInArray = this.selectedIndices.indexOf(index);

    if (indexInArray !== -1) {
      // If already selected, remove it
      this.selectedIndices.splice(indexInArray, 1);
    } else {
      // If not selected, add it
      this.selectedIndices.push(index);
    }
    this.cdr.detectChanges();

    console.log('Selected Indices:', this.selectedIndices);
  }
  private loadData() {

  }


  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(
      data => console.log('Success!', this.categories = data.data),
      error => console.error('Error:', error),
    )


    this.blogService.getBlogs().subscribe({
      next: (res) => {
        console.log(res);
        if (this.selectedIndices.length === 0) {
          this.posts = res.data
        } else {
          this.posts = res.data.filter((article) =>
            article.categories.some(category => this.selectedIndices.includes(category.id))
          );
        }
      }
    })

  }




}
