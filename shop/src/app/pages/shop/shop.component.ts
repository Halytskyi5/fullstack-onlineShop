import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";
import {ShopServiceService} from "../../services/shop-service.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: ProductDto[];
  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this.shopService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
  constructor(public shopService : ShopServiceService) {
  }
}
