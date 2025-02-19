import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductDetailService} from "../../services/product-detail.service";
import {Product} from "../../dtos/product";
import {Subscription} from "rxjs";
import {CartItem} from "../../dtos/cartItem";
import {OrderService} from "../../services/order.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{
  constructor( private productDetailService: ProductDetailService, private orderService : OrderService,
               private cartService : CartService) { }
  cart : CartItem[] = [];
  cartSubscription : Subscription;
  totalPrice : number = 0;
  ngOnInit() {
    this.cartSubscription = this.productDetailService.getProductFromCart(2)
      .subscribe( (data) =>{
        this.cart = data;
      });
    this.getTotalPrice();
  }
  getTotalPrice(){
    this.productDetailService.getProductFromCart(2)
      .subscribe( cartItems =>{
      this.cart = cartItems;
      if(this.cart){
        this.cart.map(item =>{
          this.totalPrice += item.productPrice * item.quantity;
        })
      }
    })
  }
  postOrder() {
    this.orderService.addOrder(2).subscribe(data => console.log(data));
    this.getTotalPrice();
    this.cartService.sendUpdate(this.cart);
  }
/*  removeAllProductsFromCart(cart : CartItem[]){
    for (let product of cart){
      this.removeProductFromCart(product);
    }
  }
  removeProductFromCart(product : CartItem){
    this.productDetailService.removeProductFromCart(product.id).subscribe( () =>{
      let idx = this.cart.findIndex( (data) => data.id === product.id);
      this.cart.splice(idx, 1);
    })
  }*/

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
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
