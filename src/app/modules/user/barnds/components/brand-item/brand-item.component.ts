import { Brand } from './../../../products/models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-item',
  imports: [],
  templateUrl: './brand-item.component.html',
  styleUrl: './brand-item.component.scss'
})
export class BrandItemComponent {
  @Input() brand: Brand = {} as Brand
}
