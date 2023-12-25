import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { AuthService } from '../services/auth.service';
interface BlogPost {
  email?: string;
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
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  postId: number;
  detailedPost: BlogPost;
  allPosts: BlogPost[];
  similarArticles: BlogPost[];


  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(["/"])
  }
  filterSimilarArticles() {
    // Filter the posts to get similar articles based on the postId
    this.similarArticles = this.allPosts.filter(post => post.id == this.postId);
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = +params['id']; // Convert the route parameter to a number

      // Fetch the blog post details
      this.blogService.getBlogPostById(this.postId).subscribe({
        next: (res) => this.detailedPost = res
      });

      //Fetch all posts
      this.blogService.getBlogs().subscribe(
        {
          next: (res) => { this.allPosts = res.data, this.filterSimilarArticles() }

        }
      )
    });
  }


}
