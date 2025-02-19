import { Component } from '@angular/core';
import {Product} from "../dtos/product";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  products : Product[] = [
    {id: 1, name: "Футболка USA", image: "first-photo-collection.jpg", price: 99, availableQuantity: 1},
    {id: 2, name: "Купальник Glow", image: "second-photo-collection.jpg", price: 123, availableQuantity: 1},
    {id: 3, name: "Світшот", image: "third-photo-collection.jpg", price: 139, availableQuantity: 1},
  ]
}
