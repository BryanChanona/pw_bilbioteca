import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge, pipe } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('');

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
