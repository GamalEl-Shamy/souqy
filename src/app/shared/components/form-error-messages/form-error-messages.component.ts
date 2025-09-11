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
}
