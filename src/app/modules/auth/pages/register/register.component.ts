import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessagesComponent } from "../../../../shared/components/form-error-messages/form-error-messages.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormErrorMessagesComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorMsg: string = ''
  isLoading: boolean = false
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  authForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  }, { validators: [this.checkPasswordValidator] })

  checkPasswordValidator(control: AbstractControl) {
    if (control.get('password')?.value == control.get('rePassword')?.value) {
      return null
    } else {
      return {
        mismatch: true
      }
    }
  }

  getValues() {
    if (this.authForm.valid) {
      this.isLoading = true
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.router.navigate(['/login'])
            this.isLoading = false
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message
          console.log(this.errorMsg);
          this.isLoading = false

        }
      })
    } else {
      this.authForm.markAllAsTouched()
    }
  }
}
