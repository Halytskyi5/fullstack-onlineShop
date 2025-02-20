import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthDto} from "../dtos/authDto";
import {Observable, of} from "rxjs";
import {UserDto} from "../dtos/userDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080";
  constructor(private httpClient : HttpClient) { }


  login(authDto : AuthDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.url}/login`, authDto, /*{headers: this.getHeaders()}*/);
  }

  register(authDto : AuthDto) : Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.url}/register`, authDto, /*{headers: this.getHeaders()}*/);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token : string) {
      window.localStorage.setItem("auth_token", token);
  }

  removeAuthToken() {
    window.localStorage.removeItem("auth_token");
  }
  getUser(): any {
    return window.localStorage.getItem("user");
  }

  setUser(user: UserDto) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
  removeUser() {
    window.localStorage.removeItem("user");
  }

  loggedIn$() : Observable<boolean> {
     if (this.getAuthToken() == null) {
       return of(false);
     }
     return of(true);
  }

  getHeaders() {
    let headers = {};
    let token = this.getAuthToken();
    if (token !== null) {
      headers = { "Authorization" : "Bearer " + token }
    }
    return headers;
  }
}
