import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { Cart } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {

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
      }
    })
  }

  removeItem(ProductId: string) {
    this.cartService.removeItem(ProductId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.toaster.warning('Product deleted!')
          this.cartDetails = res
          this.cartService.cartCounter.next(res.numOfCartItems)
        }
      }
    })
  }

  updateQuantity(productId: string, count: number) {
    this.cartService.updateQuantity(productId, count).subscribe({
      next: (res) => {
        this.cartDetails = res
        this.cartService.cartCounter.next(res.numOfCartItems)
      }
    })
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.toaster.warning('Shopping cart cleared successfully!')
          this.loadCartItems()
          this.cartService.cartCounter.next(0)
        }
      }
    })
  }
}
