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
  private token: string = '5621ba17c1af43af2975b04076c244d8630fafd4b7f6ec75d5f9f2edeb42a0db';


  emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
  valid = true;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)])
    })
  }

  onSubmit() {
    const email: string = this.myForm.get('email').value;
    this.auth.postUser(email, this.token).subscribe(
      (response) => {
        console.log('Email sent successfully', response);
        this.valid = true;
      },
      (error) => {
        this.valid = false;
      }
    );
    this.myForm.reset()
  }
}
