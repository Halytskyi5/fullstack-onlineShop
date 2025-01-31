import {Component, OnInit} from '@angular/core';
import {Product} from "../../entities/product";
import {ShopServiceService} from "../../services/shop-service.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: Product[];
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
