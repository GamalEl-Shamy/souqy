import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  onAddToCart() {
    this.addToCart.emit(this.product._id)
  }
}
