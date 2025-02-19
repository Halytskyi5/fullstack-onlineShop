import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Product} from "../dtos/product";

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  serviceURL = "http://localhost:8080/products";
  constructor(public http : HttpClient) {
  }
  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.serviceURL);
  }

}
