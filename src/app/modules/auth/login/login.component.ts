import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  public hasAuthenticationFailed: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private snackBar: MatSnackBar
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
          this.snackBar.open('Autenticazione fallita!', 'chiudi', {
            duration: 2000,
          });
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
