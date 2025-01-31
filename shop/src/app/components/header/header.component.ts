import {Component, OnInit} from '@angular/core';
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
export class HeaderComponent implements OnInit{
  cart : CartItem[] = [];

  cartSubscription : Subscription;
  private subscriptionCartUpdate : Subscription;

  constructor(private productDetailService : ProductDetailService,
    private cartService : CartService) {
    this.subscriptionCartUpdate = this.cartService.getUpdate().subscribe(products =>{
      this.getCart();
    })
  }
  ngOnInit() {
    this.getCart();
  }

  getCart(){
    this.cartSubscription = this.productDetailService.getProductFromCart(2) // !
      .subscribe( (data) =>{
      this.cart = data;
        console.log(this.cart);
    });
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
    this.subscriptionCartUpdate.unsubscribe();
  }

}
