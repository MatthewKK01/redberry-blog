import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { BlogService } from '../services/blog.service';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(public categoriesService: CategoryService, public blogService: BlogService, public auth: AuthService, public router: Router) { }

  public categories: any[] = [];
  public isLoggedIn: boolean = false

  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';

  public posts: any[] | undefined

  ngOnInit(): void {
    this.categoriesService.getCategories(this.token).subscribe(
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

  }

  navigate() {
    this.router.navigate(['newblog']); // Navigate to the specified route (e.g., home)
  }


}
