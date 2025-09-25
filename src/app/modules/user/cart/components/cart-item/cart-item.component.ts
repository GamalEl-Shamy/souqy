import { resolve } from 'node:path';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Cart, Product } from '../../models/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() product: Product = {} as Product
  @Output() removeItem: EventEmitter<string> = new EventEmitter<string>()
  @Output() changeCount: EventEmitter<{ id: string, count: number }> = new EventEmitter<{ id: string, count: number }>()

  onRemoveItem() {
    this.removeItem.emit(this.product.product._id)
  }

  onChangeCount(count: number) {
    this.changeCount.emit({ id: this.product.product._id, count })
  }
}
