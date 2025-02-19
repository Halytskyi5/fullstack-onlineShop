import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartItem} from "../dtos/cartItem";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Subject<CartItem[]>();
  sendUpdate(productsCart : CartItem[]){
    this.cart.next(productsCart);
  }
  getUpdate():Observable<CartItem[]>{
    return this.cart.asObservable();
  }
  constructor() { }
}
