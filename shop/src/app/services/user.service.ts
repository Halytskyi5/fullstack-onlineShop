import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {UserDto} from "../dtos/userDto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<UserDto>()
  constructor(private http : HttpClient) {

  }
  getUser(id : number) : Observable<UserDto> {
    return this.http.get<UserDto>(`http://localhost:8080/users/${id}`);
  }
}
