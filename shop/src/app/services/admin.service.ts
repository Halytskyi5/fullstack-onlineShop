import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dtos/userDto";
import {AuthService} from "./auth.service";
import {ProductDto} from "../dtos/productDto";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl = 'http://localhost:8080/admin';
  constructor(private http : HttpClient, private authService : AuthService) { }

  getUsers(id : number) {
    return this.http.get<UserDto[]>(`${this.adminUrl}/users?admin_id=${id}`,
      {headers: this.authService.getHeaders()});
  }

  getProducts(id : number) {
    return this.http.get<ProductDto[]>(`${this.adminUrl}/products?admin_id=${id}`,
      {headers: this.authService.getHeaders()});
  }

  putUser(user : UserDto, id : number) {
    return this.http.put<UserDto>(`${this.adminUrl}/edit-user?admin_id=${id}`,user,
      {headers: this.authService.getHeaders()})
  }
}
