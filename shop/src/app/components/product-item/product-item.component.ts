import {Component, Input} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() products: ProductDto[];
  @Input() showPaggination: boolean = false;
  p: number = 1;

}
