import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';



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
  constructor(private categoryService: CategoryService, private blogservice: BlogService, private router: Router) {

  }

  categories: Categories[] = [];
  myForm: FormGroup;

  public Photo: FileHandle = null;
  selectedCategories: any[] = [1, 2];
  myImage = new FormData()
  emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;


  selectedItems = [];
  dropdownSettings = {};



  private atLeastTwoWordsValidator() {
    return (control) => {
      const value = control.value || '';
      const words = value.trim().split(/\s+/);
      return words.length >= 2 ? null : { atLeastTwoWords: true };
    };
  }


  onSubmit() {
    const selectedIds = this.myForm.get('selectedItems').value.map(item => item.id);

    const formData = this.myForm.value;
    const blogData = {

      title: formData.title,
      description: formData.description,
      image: this.myImage, 
      publish_date: formData.publish_date,
      categories: selectedIds,
      author: formData.author,
      email: formData.email,

    };

    this.blogservice.sendPost(blogData).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      }
    )
  }

  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {

    this.myForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      image: new FormControl(null, [Validators.required]),
      selectedItems: new FormControl([]),
      publish_date: new FormControl(null, [Validators.required]),

      author: new FormControl(null, [Validators.required, Validators.pattern(/^[\u10A0-\u10FF\s\r\n]*$/), // Only Georgian symbols
      this.atLeastTwoWordsValidator(), // At least 4 words
      Validators.minLength(4), // At least 2 digits
      ]),
      email: new FormControl(null, [Validators.email, Validators.pattern(this.emailRegex)])
    })

    this.categoryService.getCategories().subscribe(
      {
        next: (res) => { this.categories = res.data, console.log(this.categories) }
      }
    )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
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

      this.myImage.append('image', this.Photo.file);

    }
  }





}
