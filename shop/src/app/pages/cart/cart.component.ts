import {Component, OnInit} from '@angular/core';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartItem} from "../../entities/cartItem";
import {Subscription} from "rxjs";
import {ProductDetailService} from "../../services/product-detail.service";
import {CartService} from "../../services/cart.service";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(
    private productDetailService: ProductDetailService,
    private cartService : CartService,
    private userService : UserService
  ) { }
  cart : CartItem[] = [];
  user : User;
  cartSubscription : Subscription;
  totalPrice : number = 0;

  ngOnInit() {
    this.initializeUserAndProducts();
  }

  initializeUserAndProducts() {
    this.userService.getUser(2).subscribe(
      user => {
        this.user = user;
        this.cartSubscription = this.productDetailService.getProductFromCart(this.user.id)
          .subscribe( (data) =>{
            this.cart = data;
          });
        this.getTotalPrice();
      }
    );
  }

  getTotalPrice(){
    this.productDetailService.getProductFromCart(this.user.id).subscribe( cartItems =>{
      this.cart = cartItems;
      if(this.cart){
        this.cart.map(item =>{
          this.totalPrice += item.productPrice * item.quantity;
        })
      }
    })
  }


  removeProductFromCart(item : CartItem){
    this.productDetailService.removeProductFromCart(item.id).subscribe( () =>{
      let idx = this.cart.findIndex( (data) => data.id === item.id);
      this.cart.splice(idx, 1);
    })
  }

  sendCartProducts(){
    this.cartService.sendUpdate(this.cart);
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
