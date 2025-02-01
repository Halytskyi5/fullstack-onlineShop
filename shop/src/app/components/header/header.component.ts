import {Component, OnDestroy, OnInit} from '@angular/core';
import { AppModule} from "../../app.module";
import {ProductDetailService} from "../../services/product-detail.service";
import {Product} from "../../entities/product";
import {CartItem} from "../../entities/cartItem";
import {Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {User} from "../../entities/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  cart : CartItem[] = [];

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
