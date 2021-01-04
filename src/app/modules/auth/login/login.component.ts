import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public controls: any;
  public errors: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.loginForm = fb.group({
      identity: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.controls = this.loginForm.controls;
  }

  doLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const values = this.loginForm.value;
    this.authService
      .login(values.identity, values.password)
      .subscribe((response) => {
        if (!response.success) {
          this.errors = response.errors;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
