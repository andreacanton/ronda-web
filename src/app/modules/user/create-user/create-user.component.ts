import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, map } from 'rxjs/operators';
import { AVAILABLE_ROLES, AVAILABLE_STATUSES } from 'src/app/data/const';
import { UsersService } from '../../../data/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;

  public availableRoles = AVAILABLE_ROLES;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UsersService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const fb = this.fb;
    this.userForm = fb.group({
      firstname: [null],
      lastname: [null],
      memberNumber: [
        null,
        [Validators.required, Validators.pattern(/^\d*$/)],
        this.uniqueFieldValidator('memberNumber').bind(this),
      ],
      email: [
        null,
        [Validators.required, Validators.email],
        this.uniqueFieldValidator('email').bind(this),
      ],
      password: [null, Validators.required],
      role: ['member', Validators.required],
    });
  }
  public generatePassword(): void {
    const validChars =
      'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()+=-|?/<>,.';

    let generatedPassword = '';
    for (let i = 0; i < 12; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    this.userForm.controls.password.setValue(generatedPassword);
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.userForm.disable();
      this.userService.saveUser(this.userForm.value).subscribe(
        (res) => {
          this.userForm.enable();
          this.snackBar.open('Utente registrato correttamente!', 'ignora', {
            duration: 2000,
          });
        },
        (error) => {
          this.userForm.enable();
          this.snackBar.open('Errore nel salvataggio!', 'ignora', {
            duration: 2000,
          });
        }
      );
    }
  }
  private uniqueFieldValidator(fieldName: string): AsyncValidatorFn {
    return (control: FormControl) => {
      return this.userService.isFieldTaken(fieldName, control.value).pipe(
        delay(500),
        map((isTaken) => (isTaken ? { isTaken: true } : null))
      );
    };
  }
}
