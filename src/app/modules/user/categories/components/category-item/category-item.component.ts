import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() category: Category = {} as Category
}
