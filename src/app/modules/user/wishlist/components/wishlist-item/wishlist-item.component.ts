import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Daum } from '../../models/wishlist.interface';

@Component({
  selector: 'app-wishlist-item',
  imports: [RouterLink],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.scss'
})
export class WishlistItemComponent {
  @Input() product: Daum = {} as Daum
  @Output() removeFromWishlist: EventEmitter<string> = new EventEmitter<string>()
  @Output() addToCart: EventEmitter<string> = new EventEmitter<string>()

  onRemoveFromWishlist() {
    this.removeFromWishlist.emit(this.product._id)
  }

  onAddToCart() {
    this.addToCart.emit(this.product._id)
  }
}
