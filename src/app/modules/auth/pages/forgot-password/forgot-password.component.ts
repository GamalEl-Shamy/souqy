import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessagesComponent } from "../../../../shared/components/form-error-messages/form-error-messages.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StepperComponent } from "../../components/stepper/stepper.component";


@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, FormErrorMessagesComponent, NgClass, StepperComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  verifyEmail!: FormGroup
  verifyCode!: FormGroup
  resetPassword!: FormGroup

  errorMsg: string = ''
  userEmail: string = ''
  isLoading: boolean = false
  step: number = 1

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.verifyEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode: ['', [Validators.required]]
    })

    this.resetPassword = this.fb.group({
      email: [this.userEmail, [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    })
  }


  formStepOne(): void {
    if (this.verifyEmail.valid) {
      this.isLoading = true
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg == "success") {
            this.step = 2
            this.isLoading = false
            this.userEmail = this.verifyEmail.get('email')?.value

            this.resetPassword.patchValue({
              email: this.userEmail
            });

            this.errorMsg = ''
          }
        }, error: (err) => {
          this.errorMsg = err.error.message
          this.isLoading = false
        }
      })
    } else {
      this.verifyEmail.markAllAsTouched()
    }
  }

  formStepTwo(): void {
    if (this.verifyCode.valid) {
      this.isLoading = true
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          if (res.status == "Success") {
            this.step = 3
            this.isLoading = false
            this.errorMsg = ''
          }
        }, error: (err) => {
          this.errorMsg = err.error.message
          this.isLoading = false
        }
      })
    } else {
      this.verifyCode.markAllAsTouched()
    }
  }

  formStepThree(): void {
    if (this.resetPassword.valid) {
      this.isLoading = true
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res)
          if (typeof window != 'undefined') {
            localStorage.setItem('token', res.token)
          }
          this.router.navigate(['/home'])
          this.isLoading = false
        }, error: (err) => {
          this.errorMsg = err.error.message
        }
      })
    } else {
      this.resetPassword.markAllAsTouched()
    }
  }

}
