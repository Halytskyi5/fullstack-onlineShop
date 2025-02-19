import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppModule} from "../../app.module";
import {ProductDetailService} from "../../services/product-detail.service";
import {ProductDto} from "../../dtos/productDto";
import {CartItemDto} from "../../dtos/cartItemDto";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  cart : CartItemDto[] = [];

  private getCartSubscription : Subscription;
  private cartUpdateSubscription : Subscription;

  constructor(private productDetailService : ProductDetailService,
    private cartService : CartService) {
    this.cartUpdateSubscription = this.cartService.getUpdate().subscribe(products =>{
      this.getCart();
    })
  }
  ngOnInit() {
    this.getCart();
  }

  getCart(){
    this.getCartSubscription = this.productDetailService.getProductFromCart(2) // !
      .subscribe( (data) =>{
      this.cart = data;
    });
  }
  ngOnDestroy(){
    if(this.getCartSubscription) this.getCartSubscription.unsubscribe();
    this.cartUpdateSubscription.unsubscribe();
  }
}
