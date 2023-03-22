import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-password-form',
  template: `
  <div [formGroup]="form">
    <label for="password">Password</label>
    <input formControlName="password" type="password" id="password" />
    <div *ngIf="passwordControl.touched && passwordControl.hasError('required')" class="error">
      password is required
    </div>

    <label for="confirm-password">Confirm Password</label>
    <input formControlName="confirmPassword" type="password" id="confirm-password" />
    <div *ngIf="confirmPasswordControl.touched && confirmPasswordControl.hasError('required')" class="error">
      password is required
    </div>

    <div *ngIf="passwordControl.touched && confirmPasswordControl.touched && form.hasError('missmatch')" class="error">
      passwords do not match
    </div>
  </div>
  `,
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormComponent  implements ControlValueAccessor, OnDestroy {
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): PasswordFormValues {
    return this.form.value;
  }

  set value(value: PasswordFormValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passwordControl() {
    return this.form.controls['password'];
  }

  get confirmPasswordControl() {
    return this.form.controls['confirmPassword'];
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { passwords: { valid: false, }, };
  }

  reset() {
    this.form.reset();
  }
}
function matchingInputsValidator(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

