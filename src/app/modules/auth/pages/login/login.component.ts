import { Component, inject, OnInit } from '@angular/core';
import { FormErrorMessagesComponent } from "../../../../shared/components/form-error-messages/form-error-messages.component";
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormErrorMessagesComponent, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  errorMsg: string = ''
  isLoading: boolean = false
  eyeToggle: boolean = false
  authForm!: FormGroup
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  getValues() {
    if (this.authForm.valid) {
      this.isLoading = true
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.authService.saveToken(res.token)
            this.router.navigate(['/products'])
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

  togglePassword() {
    this.eyeToggle = !this.eyeToggle
  }
}
