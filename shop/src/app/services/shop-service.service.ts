import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ProductDto} from "../dtos/productDto";

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  serviceURL = "http://localhost:8080/products";
  constructor(public http : HttpClient) {
  }
  getProducts() : Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(this.serviceURL);
  }

}
