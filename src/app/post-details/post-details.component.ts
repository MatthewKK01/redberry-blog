import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = +params['id']; // Convert the route parameter to a number

      // Fetch the blog post details
      this.blogService.getBlogPostById(this.postId, this.token).subscribe((post) => {
        console.log(post); // Log the retrieved post details
      });
    });
  }
}
