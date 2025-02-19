import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthDto} from "../dtos/authDto";
import {Observable} from "rxjs";
import {UserDto} from "../dtos/userDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080";
  private headers = {};
  private currentUser : UserDto;
  constructor(private httpClient : HttpClient) { }


  get user(): UserDto {
    return this.currentUser;
  }

  set user(value: UserDto) {
    this.currentUser = value;
  }

  login(authDto : AuthDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.url, authDto);
  }

  register(authDto : AuthDto) : Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.url, authDto);
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token : string | null) {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
      this.headers = {"Authorization" : "Bearer " + token};
    } else {
      window.localStorage.removeItem("auth_token");
      this.headers = {};
    }
  }
}
