import {Component, Input} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products : ProductDto[] = [
    {id: 1, name: "Футболка USA", image: "first-photo-collection.jpg", price: 99, availableQuantity: 1},
    {id: 2, name: "Купальник Glow", image: "second-photo-collection.jpg", price: 123, availableQuantity: 1},
    {id: 3, name: "Світшот", image: "third-photo-collection.jpg", price: 139, availableQuantity: 1},
  ]
}
