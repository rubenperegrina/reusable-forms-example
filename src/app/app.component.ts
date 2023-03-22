import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
  <h1>Building Reusable Forms in Angular</h1>

  <form [formGroup]="signupForm" (ngSubmit)="submit()">
    <app-profile-form formControlName="profile"></app-profile-form>
    <app-password-form formControlName="password"></app-password-form>
    <button>Sign Up</button>
    <button type="button" (click)="resetForm()">Reset</button>
  </form>

  <p>
    Form is {{signupForm.valid ? 'Valid' : 'Invalid'}}
  </p>

  <pre>
  {{signupForm.value | json}}
  </pre>
  `,
  styles: []
})
export class AppComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      password: [],
      profile: []
    });
  }

  submit() {
    console.log(this.signupForm.value);
  }

  resetForm() {
    this.signupForm.reset();
  }
}
