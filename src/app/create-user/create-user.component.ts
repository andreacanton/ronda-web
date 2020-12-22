import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public createForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.createForm = fb.group({
      firstname: [null],
      lastname: [null],
      memberNumber: [null, [Validators.required, Validators.pattern(/^\d*$/)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  public generatePassword() {
    const validChars =
      'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()+=-|?/<>,.';

    let generatedPassword = '';
    for (let i = 0; i < 12; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.createForm.controls.password.setValue(generatedPassword);
  }
}
