import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartItemDto} from "../dtos/cartItemDto";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new Subject<CartItemDto[]>();
  cartURL: string = "http://localhost:8080/cart";
  constructor(private http : HttpClient, private authService : AuthService) { }
  sendUpdate(productsCart : CartItemDto[]){
    this.cart.next(productsCart);
  }
  getUpdate():Observable<CartItemDto[]>{
    return this.cart.asObservable();
  }


  postProductToCart(item: CartItemDto, userId: number) {
    return this.http.post<CartItemDto>(`${this.cartURL}?user_id=${userId}`, item,
      {headers : this.authService.getHeaders()});
  }

  getProductFromCart(userId: number) {
    return this.http.get<CartItemDto[]>(`${this.cartURL}?user_id=${userId}`,
      {headers: this.authService.getHeaders()});
  }

  removeProductFromCart(id: number) {
    return this.http.delete(`${this.cartURL}/${id}`, {
      responseType: 'text',
      headers: this.authService.getHeaders()
    });
  }
}
