import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductDetailService} from "../../services/product-detail.service";
import {Product} from "../../entities/product";
import {Subscription} from "rxjs";
import {CartItem} from "../../entities/cartItem";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  constructor( private productDetailService: ProductDetailService) { }
  cart : CartItem[] = [];
  cartSubscription : Subscription;
  totalPrice : number = 0;
  getTotalPrice(){
    this.productDetailService.getProductFromCart(this.productDetailService.user.id)
      .subscribe( cartItems =>{
      this.cart = cartItems;
      if(this.cart){
        this.cart.map(item =>{
          this.totalPrice += item.productPrice * item.quantity;
        })
      }
    })
  }
  ngOnInit() {
    this.cartSubscription = this.productDetailService.getProductFromCart(this.productDetailService.user.id)
      .subscribe( (data) =>{
      this.cart = data;
    });
    this.getTotalPrice();
  }
  ngOnDestroy(){
    if(this.cartSubscription) this.cartSubscription.unsubscribe();
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
  removeProductFromCart(product : CartItem){
    this.productDetailService.removeProductFromCart(product.id).subscribe( () =>{
      let idx = this.cart.findIndex( (data) => data.id === product.id);
      this.cart.splice(idx, 1);
    })
  }
  removeAllProductsFromCart(cart : CartItem[]){
    for (let product of cart){
      this.removeProductFromCart(product);
    }
  }
}
