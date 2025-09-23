import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from './../../models/product';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { CartService } from '../../../cart/services/cart.service';


@Component({
  selector: 'app-product-details',
  imports: [NgClass, SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: Product = {} as Product;
  displayImage?: string;
  count: number = 1;
  errorMessage: string = '';
  errorTimeout?: ReturnType<typeof setTimeout>;
  isLoading: boolean = false

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)

  ngOnInit(): void {
    this.getId()

  }

  getId() {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        this.id = value.get('id')
        if (this.id) {
          this.getProductById()
        }
      }
    })
  }

  getProductById() {
    this.productsService.getProductById(this.id).subscribe({
      next: (res) => {
        this.product = res.data
        this.isLoading = true
        if (this.product) {
          this.displayImage = this.product.imageCover
        }
      }
    })
  }


  changeImageCover(imgUrl: string) {
    this.displayImage = imgUrl;
  }

  increaseCount(quantity: number) {
    if (this.count < 10 && this.count < quantity) {
      ++this.count
      this.errorMessage = ''
    } else {
      this.showError(`You cannot buy more than ${this.count} items`)
    }
  }

  decreaseCount() {
    if (this.count > 1) {
      --this.count
      this.errorMessage = ''
    } else {
      this.showError('You must buy at least 1 item')
    }
  }

  showError(message: string) {
    this.errorMessage = message;

    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }

    this.errorTimeout = setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

      }
    })
  }
}
