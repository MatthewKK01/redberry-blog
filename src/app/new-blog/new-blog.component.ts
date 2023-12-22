import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';



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
  constructor(private categoryService: CategoryService, private blogservice: BlogService) {

  }

  categories: Categories[] = [];
  myForm: FormGroup;

  public Photo: FileHandle = null;
  selectedCategories: any[] = [1, 2];




  private atLeastTwoWordsValidator() {
    return (control) => {
      const value = control.value || '';
      const words = value.trim().split(/\s+/);
      return words.length >= 2 ? null : { atLeastTwoWords: true };
    };
  }


  onSubmit() {
    console.log(this.myForm.value);
    const formData = this.myForm.value;
    const blogData = {

      title: formData.title,
      description: formData.description,
      image: this.Photo.url, // Assuming 'image' is a FileHandle with a 'url' property
      publish_date: formData.publish_date,
      categories: [1, 3],
      author: formData.author,
      email: formData.email,

    };
    console.log(`full data: ${blogData}`);
    this.blogservice.sendPost(blogData).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      }
    )
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),

      publish_date: new FormControl(null, [Validators.required]),

      author: new FormControl(null, [Validators.required, Validators.pattern(/^[\u10A0-\u10FF\s\r\n]*$/), // Only Georgian symbols
      this.atLeastTwoWordsValidator(), // At least 4 words
      Validators.minLength(4), // At least 2 digits
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    })


    this.categoryService.getCategories().subscribe(
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
