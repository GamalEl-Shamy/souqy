import { Component, inject } from '@angular/core';
import { FormErrorMessagesComponent } from "../../../../shared/components/form-error-messages/form-error-messages.component";
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormErrorMessagesComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  errorMsg: string = ''
  isLoading: boolean = false
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })



  getValues() {
    if (this.authForm.valid) {
      this.isLoading = true
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.router.navigate(['/products'])
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
