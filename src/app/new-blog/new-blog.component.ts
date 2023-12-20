import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }

  public categories: any[] = [];

  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';

  ngOnInit() {
    this.categoryService.getCategories(this.token).subscribe(
      {
        next: res => this.categories = res.data,
        error: err => console.log(err)
      }
    )
  }
}
