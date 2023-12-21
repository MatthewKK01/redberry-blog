import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { DragDirective } from './drag.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NewBlogComponent,
    DragDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
