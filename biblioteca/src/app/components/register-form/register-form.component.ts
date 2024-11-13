import { Component, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { ChangeDetectionStrategy } from '@angular/core';
import { merge, pipe } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatFormField],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {


  errorMessage = signal('');
  readonly name = new FormControl('', Validators.required);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  readonly confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);



  constructor() {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter an email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    }else {
      this.errorMessage.set('');
    }
  }
}
