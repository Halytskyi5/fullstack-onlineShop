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
  private headers = {};
  private currentUser : UserDto;
  constructor(private httpClient : HttpClient) { }


  getUser(): UserDto {
    return this.currentUser;
  }

  setUser(user: UserDto) {
    this.currentUser = user;
  }

  login(authDto : AuthDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.url}/login`, authDto, {headers: this.headers});
  }

  register(authDto : AuthDto) : Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.url}/register`, authDto, {headers: this.headers});
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
  loggedIn$() : Observable<boolean> {
     if (this.getAuthToken() == null) {
       return of(false);
     }
     return of(true);
  }
}
