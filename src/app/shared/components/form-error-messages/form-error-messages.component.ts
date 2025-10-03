import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-messages',
  imports: [],
  templateUrl: './form-error-messages.component.html',
  styleUrl: './form-error-messages.component.scss'
})
export class FormErrorMessagesComponent {
  @Input() control!: AbstractControl | null
  @Input() passState!: boolean

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.control?.value || '');
  }

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.control?.value || '');
  }

  get hasNumber(): boolean {
    return /[0-9]/.test(this.control?.value || '');
  }

  get hasSpecialCharacter(): boolean {
    return /[^A-Za-z0-9]/.test(this.control?.value || '');
  }
}
