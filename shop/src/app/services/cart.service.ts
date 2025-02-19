import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartItemDto} from "../dtos/cartItemDto";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Subject<CartItemDto[]>();
  sendUpdate(productsCart : CartItemDto[]){
    this.cart.next(productsCart);
  }
  getUpdate():Observable<CartItemDto[]>{
    return this.cart.asObservable();
  }
  constructor() { }
}
