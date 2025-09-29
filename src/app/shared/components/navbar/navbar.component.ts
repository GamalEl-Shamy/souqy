import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CartService } from '../../../modules/user/cart/services/cart.service';
import { WishlistService } from '../../../modules/user/wishlist/services/wishlist.service';
import { timeStamp } from 'console';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @Input() authType: string = ''
  isMobile: boolean = true;
  cartCounter: number = 0
  wishlistCounter: number = 0

  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private wishlistService = inject(WishlistService)

  ngOnInit(): void {
    // this.cartCounter = this.cartService.cartCounter
    this.cartService.cartCounter.subscribe({
      next: (res) => {
        this.cartCounter = res
      }
    })

    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartCounter = res.numOfCartItems
      }
    })

    // this.wishlistCounter = this.wishlistService.wishlistCounter
    this.wishlistService.wishlistCounter.subscribe({
      next: (res) => {
        this.wishlistCounter = res
      }
    })

    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishlistCounter = res.count
      }
    })
  }

  mobileToggle() {
    this.isMobile = !this.isMobile
  }

  logout() {
    this.authService.logout()
  }

}
