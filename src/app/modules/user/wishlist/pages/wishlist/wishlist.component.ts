import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';
import { RouterLink } from '@angular/router';
import { Wishlist } from '../../models/wishlist.interface';
import { WishlistItemComponent } from "../../components/wishlist-item/wishlist-item.component";

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, WishlistItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlistDetails: Wishlist = {} as Wishlist
  isLoading: boolean = false
  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)

  private readonly toaster = inject(ToastrService)

  ngOnInit(): void {
    this.loadWishlistItems()
  }

  loadWishlistItems() {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishlistDetails = res
        this.isLoading = true
      }
    })
  }

  removeItemFromWishlist(ProductId: string, toast: boolean = true) {
    this.wishlistService.removeProductFromWishList(ProductId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.wishlistService.wishlistCounter.next(res.data.length)
          //this.wishlistDetails = res           // call loadWishlistItems if find error
          this.loadWishlistItems()
          if (toast) {
            this.toaster.warning(res.message)
          }
        }
      }
    })
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status == 'success') {
          // this.cartService.cartCounter = res.data.numOfCartItems
          this.cartService.cartCounter.next(res.numOfCartItems)
          this.removeItemFromWishlist(id, false)
          this.wishlistService.wishlistCounter.next(res.data.length)
          this.toaster.success(res.message);
        }
      }
    })
  }
}
