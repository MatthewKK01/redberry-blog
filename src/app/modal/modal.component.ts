import { Component, OnInit } from '@angular/core';

import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  myForm: FormGroup;

  emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
  valid = true;
  showSuccesMessage = false;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)])
    })
  }

  onSubmit() {
    const email: string = this.myForm.get('email').value;
    this.auth.postUser(email).subscribe(
      {
        next: response => {
          console.log('Email sent successfully', response);
          this.valid = true;
          this.showSuccesMessage = true;
          this.auth.setResponseStatus(response.status)
        },
        error: err => { this.valid = false; }
      }


    );
    this.myForm.reset()
  }
}
