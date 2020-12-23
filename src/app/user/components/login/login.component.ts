import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
