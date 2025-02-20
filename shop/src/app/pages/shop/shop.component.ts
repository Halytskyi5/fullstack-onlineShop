import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";
import {ProductDetailService} from "../../services/product-detail.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  products: ProductDto[];
  constructor(public productService : ProductDetailService) {
  }
  ngOnInit() {
    this.getProducts();
  }
  getProducts(){
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
}
