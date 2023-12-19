import { Component, OnInit } from '@angular/core';

import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  myForm: FormGroup;

  emailRegex = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;

  constructor() { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)])
    })

  }
}
