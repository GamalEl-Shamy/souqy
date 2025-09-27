import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CartService } from '../../../modules/user/cart/services/cart.service';


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

  private authService = inject(AuthService)
  private cartService = inject(CartService)

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
  }

  mobileToggle() {
    this.isMobile = !this.isMobile
  }

  logout() {
    this.authService.logout()
  }

}
