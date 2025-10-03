import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormErrorMessagesComponent } from "../../../../shared/components/form-error-messages/form-error-messages.component";
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { checkPasswordValidator } from '../../../../shared/helpers/password-match';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormErrorMessagesComponent, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  errorMsg: string = ''
  isLoading: boolean = false
  eyeToggleP: boolean = false
  eyeToggleR: boolean = false
  authForm!: FormGroup
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  ngOnInit(): void {
    this.formInit()

  }

  formInit() {
    this.authForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
    }, { validators: [checkPasswordValidator] })
  }



  getValues() {
    if (this.authForm.valid) {
      this.isLoading = true
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.router.navigate(['/login'])
            this.isLoading = false
          }
        },
        error: (err) => {
          this.errorMsg = err.error.message
          this.isLoading = false

        }
      })
    } else {
      this.authForm.markAllAsTouched()
    }
  }

  togglePasswordP() {
    this.eyeToggleP = !this.eyeToggleP
  }

  togglePasswordR() {
    this.eyeToggleR = !this.eyeToggleR
  }
}
