import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SafeUrl } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';


interface FullBlog {
  title: string,
  description: string,
  image: Blob,
  publish_date: string,
  categories: number[],
  author: string,
  email: string
}

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
  private formSubscription: Subscription;
  categories: Categories[] = [];
  public myForm: FormGroup;
  formData = new FormData();
  blob: any = {}

  public Photo: FileHandle = null;
  selectedCategories: any[] = [1, 2];
  emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;


  selectedItems: Categories[] = [
  ];

  listVisible = false;


  onItemClick(item: any) {
    // Check if the item is already selected
    const index = this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id);

    if (index === -1) {
      // If not selected, add it to the selectedItems array
      this.selectedItems.push(item);
      this.myForm.get('categories').setValue([...this.myForm.get('categories').value, item])
    }


  }
  removeItem(item: any) {
    const index = this.selectedItems.findIndex(selectedItem => selectedItem.id === item.id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.myForm.get('categories').setValue(this.selectedItems.slice());
    }
  }


  private atLeastTwoWordsValidator() {
    return (control) => {
      const value = control.value || '';
      const words = value.trim().split(/\s+/);
      return words.length >= 2 ? null : { atLeastTwoWords: true };
    };
  }


  changeVisibility() {
    this.listVisible = !this.listVisible
  }

  onSubmit() {
    const selectedIds = this.selectedItems.map(item => item.id);
    const blogDataValidated = this.myForm.value;

    const fullBlog: FullBlog = {
      title: blogDataValidated.title,
      description: blogDataValidated.description,
      image: this.blob.value,
      publish_date: blogDataValidated.publish_date,
      categories: selectedIds,
      author: blogDataValidated.author,
      email: blogDataValidated.email
    }


    this.formData.append('title', fullBlog.title);
    this.formData.append('description', fullBlog.description);
    this.formData.append('publish_date', fullBlog.publish_date);
    this.formData.append('email', fullBlog.email);

    this.formData.append(`categories`, JSON.stringify(selectedIds));
    this.formData.append('author', fullBlog.author);
    console.log(this.formData);


    this.blogservice.sendPost(this.formData).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      }
    )
    localStorage.clear()
  }


  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit() {



    this.myForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      image: new FormControl(null, [Validators.required]),
      categories: new FormControl([], Validators.required),
      publish_date: new FormControl(null, [Validators.required]),

      author: new FormControl(null, [Validators.required, Validators.pattern(/^[\u10A0-\u10FF\s\r\n]*$/), // Only Georgian symbols
      this.atLeastTwoWordsValidator(), // At least 4 words
      Validators.minLength(4), // At least 2 digits
      ]),
      email: new FormControl(null, [Validators.email, Validators.pattern(this.emailRegex)])
    })

    const savedFormData = localStorage.getItem('blogFormData');
    if (savedFormData) {
      const jsonData = JSON.parse(savedFormData)
      this.myForm.setValue(jsonData);
      this.selectedItems = Array.from(new Set(jsonData.categories));
    }

    // Subscribe to form changes to update localStorage
    this.formSubscription = this.myForm.valueChanges.subscribe(value => {
      localStorage.setItem('blogFormData', JSON.stringify(value));
    });


    this.categoryService.getCategories().subscribe(
      {
        next: (res) => { this.categories = res.data, console.log(this.categories) }
      }
    )


  }

  ngOnDestroy() {
    // Unsubscribe from form changes to avoid memory leaks
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }




  fileDropped(fileHandle: FileHandle) {
    const blob = new Blob([fileHandle.file], { type: fileHandle.file.type });
    this.blob = blob;
    this.formData.append('image', blob, fileHandle.file.name);
    this.Photo = fileHandle
  }
  dismiss() {
    this.Photo = null;
    console.log(this.Photo);
  }
  fileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    this.Photo = {
      file: file,
      url: file.name
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64DataWithPrefix = event.target.result;


        // Remove the prefix ("data:image/jpeg;base64,") from the base64 data
        const base64Data = base64DataWithPrefix.split(',')[1];

        // Convert base64 to binary
        const binaryString = atob(base64Data);

        // Create a Uint8Array from the binary string
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: file.type });

        // Now 'blob' contains the binary data of the file
        this.myForm.get('image').setValue(blob);

        this.formData.append('image', blob, 'image.jpg');
        console.log(blob);
        // You can use the blob as needed, for example, upload it to a server
        // using XMLHttpRequest or fetch API
      };

      reader.readAsDataURL(file);
    }
  }


}
