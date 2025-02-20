import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AppModule} from "../../app.module";
import {ProductDetailService} from "../../services/product-detail.service";
import {ProductDto} from "../../dtos/productDto";
import {CartItemDto} from "../../dtos/cartItemDto";
import {map, Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: CartItemDto[] = [];

  private getCartSubscription: Subscription;
  private cartUpdateSubscription: Subscription;
  loggedIn: boolean = false;
  user : UserDto;

  constructor(
    private productDetailService: ProductDetailService,
    private cartService: CartService,
    private authService: AuthService,
    private router : Router
  ) {
    this.cartUpdateSubscription = this.cartService.getUpdate().subscribe(products => {
      this.getCart();
    })
  }

  ngOnInit() {
    this.authService.loggedIn$().subscribe(
      value => this.loggedIn = value
    );
    this.getCart();
  }

  getCart() {
    if(this.loggedIn) {
      this.user = JSON.parse(this.authService.getUser());
      console.log(this.user)
      this.getCartSubscription = this.productDetailService.getProductFromCart(this.user.id) // !
        .subscribe((data) => {
          this.cart = data;
        });
    }
  }

  logout() {
    this.authService.removeAuthToken();
    this.authService.removeUser();
    this.router.navigateByUrl("/login");
  }

  ngOnDestroy() {
    if (this.getCartSubscription) this.getCartSubscription.unsubscribe();
    this.cartUpdateSubscription.unsubscribe();
  }
}
