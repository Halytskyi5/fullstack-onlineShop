import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartItemDto} from "../../dtos/cartItemDto";
import {Subscription} from "rxjs";
import {ProductDetailService} from "../../services/product-detail.service";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  constructor(
    private productDetailService: ProductDetailService,
    private cartService : CartService,
    private userService : UserService
  ) {  }
  cart : CartItemDto[] = [];
  user : UserDto;
  getCartSubscription : Subscription;
  cartUpdateSubscription : Subscription;
  totalPrice : number = 0;

  ngOnInit() {
    this.initializeUserAndProducts();
    this.cartUpdateSubscription = this.cartService.getUpdate().subscribe( res => {
      this.getProducts()
    })
  }

  initializeUserAndProducts() {
    this.userService.getUser(2).subscribe(
      user => {
        this.user = user;
        this.getProducts();
      }
    );
  }

  getProducts() {
    this.getCartSubscription = this.productDetailService.getProductFromCart(2)
      .subscribe( (data) =>{
        this.cart = data;
        this.getTotalPrice();
      });

  }

  getTotalPrice(){
      if(this.cart){
        this.totalPrice = 0;
        this.cart.map(item =>{
          this.totalPrice += item.productPrice * item.quantity;
        })
      }
  }


  removeProductFromCart(item : CartItemDto){
    this.productDetailService.removeProductFromCart(item.id).subscribe( (data) =>{
      this.getProducts();
      this.sendCartProducts();
    })
  }

  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }
  ngOnDestroy(){
    if(this.getCartSubscription) this.getCartSubscription.unsubscribe();
    this.cartUpdateSubscription.unsubscribe();
  }
}
