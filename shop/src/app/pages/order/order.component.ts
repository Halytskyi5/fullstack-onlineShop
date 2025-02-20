import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductDetailService} from "../../services/product-detail.service";
import {Subscription} from "rxjs";
import {CartItemDto} from "../../dtos/cartItemDto";
import {OrderService} from "../../services/order.service";
import {CartService} from "../../services/cart.service";
import {UserDto} from "../../dtos/userDto";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{
  constructor( private productDetailService: ProductDetailService, private orderService : OrderService,
               private cartService : CartService,
               private authService : AuthService) { }
  cart : CartItemDto[] = [];
  user : UserDto;
  getCartSubscription : Subscription;
  totalPrice : number = 0;
  ngOnInit() {
    this.getUser();
    this.getCart();
    this.getTotalPrice();
  }
  getUser() {
    this.user = JSON.parse(this.authService.getUser());
  }
  getCart() {
    this.getCartSubscription = this.cartService.getProductFromCart(this.user.id)
      .subscribe( (data) =>{
        this.cart = data;
      });
  }
  getTotalPrice(){
    this.getCart();
    this.totalPrice = 0;
    if(this.cart){
      this.cart.map(item =>{
        this.totalPrice += item.productPrice * item.quantity;
      })
    }
  }
  postOrder() {
    this.orderService.addOrder(2).subscribe(data => console.log(data));
    this.getTotalPrice();
    this.cartService.sendUpdate(this.cart);
  }

  dataUserForm : FormGroup = new FormGroup({
    userName : new FormControl("", Validators.required),
    userEmail : new FormControl("", [Validators.required, Validators.email]),
    userPhone : new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")])
  });
  addressUserForm : FormGroup = new FormGroup({
    userCountry : new FormControl("", Validators.required),
    userCity : new FormControl("", Validators.required),
    userStreet : new FormControl("", Validators.required),
    userHome : new FormControl("", [Validators.required, Validators.pattern("[0-9]{1,3}")]),
    userApartment : new FormControl("", [Validators.required, Validators.pattern("[0-9]{1,3}")])
  })
  ngOnDestroy(){
    this.getCartSubscription.unsubscribe();
  }
}
