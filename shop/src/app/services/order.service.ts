import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../dtos/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderURL = 'http://localhost:8080/orders';
  constructor(private http : HttpClient) { }
  addOrder(userId : number){
    return this.http.post<Order>(`${this.orderURL}?user_id=${userId}`, {});
  }
}
