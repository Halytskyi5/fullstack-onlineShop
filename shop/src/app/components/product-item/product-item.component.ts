import {Component, Input} from '@angular/core';
import {Product} from "../../dtos/product";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() products: Product[];
  @Input() showPaggination: boolean = false;
  p: number = 1;

}
