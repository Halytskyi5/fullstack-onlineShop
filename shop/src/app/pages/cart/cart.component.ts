import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartItemDto} from "../../dtos/cartItemDto";
import {Subscription} from "rxjs";
import {ProductDetailService} from "../../services/product-detail.service";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
  }

  cart: CartItemDto[] = [];
  user: UserDto;
  getCartSubscription: Subscription;
  cartUpdateSubscription: Subscription;
  removeProductsSubscription : Subscription;
  totalPrice: number = 0;

  ngOnInit() {
    this.initializeUserAndProducts();
    this.cartUpdateSubscription = this.cartService.getUpdate().subscribe(res => {
      this.getProducts()
    })
  }

  initializeUserAndProducts() {
    this.user = JSON.parse(this.authService.getUser());
    this.getProducts();
  }

  getProducts() {
    this.getCartSubscription = this.cartService.getProductFromCart(this.user.id)
      .subscribe((data) => {
        this.cart = data;
        this.getTotalPrice();
      });
  }

  getTotalPrice() {
    if (this.cart) {
      this.totalPrice = 0;
      this.cart.map(item => {
        this.totalPrice += item.productPrice * item.quantity;
      })
    }
  }


  removeProductFromCart(item: CartItemDto) {
    this.removeProductsSubscription = this.cartService.removeProductFromCart(<number>item.id).subscribe((data) => {
      this.getProducts();
      this.cartService.sendUpdate(this.cart);
    })
  }
  unsubscribe(sub : Subscription[]) {
    sub.map(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.cartUpdateSubscription.unsubscribe();
    this.unsubscribe([this.getCartSubscription, this.removeProductsSubscription]);
  }
}
