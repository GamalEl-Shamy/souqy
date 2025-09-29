import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Daum } from '../../../wishlist/models/wishlist.interface';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product

  @Output() addToCart: EventEmitter<string> = new EventEmitter<string>()
  @Output() addToWishlist: EventEmitter<string> = new EventEmitter<string>()

  onAddToCart() {
    this.addToCart.emit(this.product._id)
  }

  onAddToWishlist() {
    this.addToWishlist.emit(this.product._id)
  }
}
