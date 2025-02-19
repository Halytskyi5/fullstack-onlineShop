import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDto} from "../dtos/productDto";
import {CartItemDto} from "../dtos/cartItemDto";
import {UserDto} from "../dtos/userDto";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService implements OnInit {
  productsURL : string = "http://localhost:8080/products";
  cartURL : string = "http://localhost:8080/cart";
  userURL : string = "http://localhost:8080/users";
  user : UserDto;
  constructor(public http: HttpClient) {
    this.ngOnInit();
  }
  ngOnInit() {
    this.initializeUser();
  }

  initializeUser() {
    this.getUser(2).subscribe(user => this.user = user);
  }

  getUser(id : number) : Observable<UserDto> {
    return this.http.get<UserDto>(`${this.userURL}/${id}`);
  }


  getProduct(id : number) : Observable<ProductDto>{
    return this.http.get<ProductDto>(`${this.productsURL}/${id}`);
  }
  postProductToCart(item : CartItemDto, userId : number){
    return this.http.post<CartItemDto>(`${this.cartURL}?user_id=${userId}`, item);
  }
  getProductFromCart(user_id : number){
    return this.http.get<CartItemDto[]>(`${this.cartURL}?user_id=${user_id}`);
  }
  updateProductToCart(item : CartItemDto){
    return this.http.put<CartItemDto>(`${this.cartURL}/${item.id}`, item); /// ??????
  }
  removeProductFromCart(id : number){
    return this.http.delete(`${this.cartURL}/${id}`, {responseType:'text'});
  }
}
