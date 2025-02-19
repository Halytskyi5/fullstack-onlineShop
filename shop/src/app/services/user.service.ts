import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../dtos/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new Subject<User>()
  constructor(private http : HttpClient) {

  }
  getUser(id : number) : Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }
}
