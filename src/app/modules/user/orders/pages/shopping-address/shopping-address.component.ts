import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormErrorMessagesComponent } from "../../../../../shared/components/form-error-messages/form-error-messages.component";
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-shopping-address',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, FormErrorMessagesComponent, NgClass],
  templateUrl: './shopping-address.component.html',
  styleUrl: './shopping-address.component.scss'
})
export class ShoppingAddressComponent implements OnInit {

  isLoading: boolean = false
  cartId: string = ''
  addressForm!: FormGroup
  cities = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Sharqia',
    'Dakahlia',
    'Beheira',
    'Minya',
    'Qalyubia',
    'Sohag',
    'Gharbia',
    'Asyut',
    'Monufia',
    'Kafr El Sheikh',
    'Faiyum',
    'Qena',
    'Beni Suef',
    'Aswan',
    'Damietta',
    'Ismailia',
    'Luxor',
    'Port Said',
    'Suez',
    'Matrouh',
    'North Sinai',
    'South Sinai',
    'New Valley',
    'Red Sea'
  ];

  private readonly orderService = inject(OrderService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly fb = inject(FormBuilder)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.cartId = res.get('id')!
    })

    this.initForm()
  }

  initForm() {
    this.addressForm = this.fb.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      city: ['', [Validators.required]]
    })
  }

  getValues() {
    if (this.addressForm.valid) {
      this.isLoading = true
      this.orderService.createOrder(this.cartId, this.addressForm.value).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            open(res.session.url, '_self')
          }

        }
      })
    }

    else {
      this.addressForm.markAllAsTouched()
    }
  }
}
