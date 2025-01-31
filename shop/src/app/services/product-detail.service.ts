import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../entities/product";
import {CartItem} from "../entities/cartItem";
import {User} from "../entities/user";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService implements OnInit {
  productsURL : string = "http://localhost:8080/products";
  cartURL : string = "http://localhost:8080/cart";
  user : User;
  constructor(public http: HttpClient) {
    this.ngOnInit();
  }
  ngOnInit() {
    this.initializeUser();
  }

  initializeUser() {
    this.getUser(1).subscribe(user => this.user = user);
  }
  getUser(id : number) : Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }


  getProduct(id : number) : Observable<Product>{
    return this.http.get<Product>(`${this.productsURL}/${id}`);
  }
  postProductToCart(item : CartItem){
    return this.http.post<CartItem>(`${this.cartURL}?user_id=${this.user.id}`, item);
  }
  getProductFromCart(user_id : number){
    return this.http.get<CartItem[]>(`${this.cartURL}?user_id=${user_id}`);
  }
  updateProductToCart(item : CartItem){
    return this.http.put<CartItem>(`${this.cartURL}/${item.id}`, item); /// ??????
  }
  removeProductFromCart(id : number){
    return this.http.delete<any>(`${this.cartURL}/${id}`);
  }
}
