import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "newblog", component: NewBlogComponent, canActivate: [authGuard]
  },
  { path: 'posts/:id', component: PostDetailsComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
