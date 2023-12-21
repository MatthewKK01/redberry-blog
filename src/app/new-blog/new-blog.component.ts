import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';



interface FileHandle {
  file: File;
  url: SafeUrl;
}
interface Categories {
  id: number,
  title: string,
  text_color: string,
  background_color: string,
}
@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }

  categories: Categories[] = [];
  public Photo: FileHandle = null;
  selectedCategories: any[] = [];


  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';

  ngOnInit() {
    this.categoryService.getCategories(this.token).subscribe(
      {
        next: (res) => this.categories = res.data
      }
    )
  }
  fileDropped(fileHandle: FileHandle) {
    this.Photo = fileHandle;
    console.log(this.Photo);
  }
  dismiss() {
    this.Photo = null;
    console.log(this.Photo);
  }
  fileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      this.Photo = { file, url };
      console.log(this.Photo);
    }
  }

}
