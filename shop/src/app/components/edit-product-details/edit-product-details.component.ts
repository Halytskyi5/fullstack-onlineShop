import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../dtos/productDto";
import {AuthService} from "../../services/auth.service";
import {UserDto} from "../../dtos/userDto";
import {ActivatedRoute} from "@angular/router";
import {ProductDetailService} from "../../services/product-detail.service";

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.scss']
})
export class EditProductDetailsComponent implements OnInit {
  user: UserDto;
  product: ProductDto;
  name: string;
  price: number;
  availableQuantity: number;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private productDetailService: ProductDetailService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getProduct();
  }

  getUser() {
    this.user = JSON.parse(this.authService.getUser());
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productDetailService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.name = product.name;
        this.price = product.price;
        this.availableQuantity = product.availableQuantity;
      });

  }

}
