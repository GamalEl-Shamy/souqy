import { Product } from './../../../products/models/product';
import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, SpinnerComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {

  isLoaded: boolean = false
  cartDetails: Cart = {} as Cart
  private readonly cartService = inject(CartService)
  private readonly toaster = inject(ToastrService)

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res
        this.isLoaded = true
      }
    })
  }

  removeItem(ProductId: string) {
    this.cartService.removeItem(ProductId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.toaster.warning('Product deleted!')
          this.cartDetails = res
        }
      }
    })
  }

  updateQuantity(productId: string, count: number) {
    this.cartService.updateQuantity(productId, count).subscribe({
      next: (res) => {
        this.cartDetails = res
      }
    })
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.toaster.warning('Shopping cart cleared successfully!')
          this.loadCartItems()
        }
      }
    })
  }
}
