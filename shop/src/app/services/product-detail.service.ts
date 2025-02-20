import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDto} from "../dtos/productDto";
import {CartItemDto} from "../dtos/cartItemDto";
import {UserDto} from "../dtos/userDto";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  productsURL: string = "http://localhost:8080/products";

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  getProduct(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.productsURL}/${id}`,
      {headers : this.authService.getHeaders()});
  }

  getProducts() : Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(this.productsURL, {headers : this.authService.getHeaders()});
  }
}
