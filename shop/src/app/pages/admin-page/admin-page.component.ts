import {Component, OnInit} from '@angular/core';
import {ProductDetailService} from "../../services/product-detail.service";
import {Observable} from "rxjs";
import {ProductDto} from "../../dtos/productDto";
import {UserDto} from "../../dtos/userDto";
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  showContent = 'products';
  products : ProductDto[] = [];
  users : UserDto[] = [];
  products$ : Observable<ProductDto[]>;
  users$ : Observable<UserDto[]>;
  admin : UserDto;
  constructor(private service : AdminService, private authService : AuthService) {
  }

  ngOnInit(): void {
    this.getAdmin();
    this.products$ = this.service.getProducts(this.admin.id);
    this.users$ = this.service.getUsers(this.admin.id);
  }
  getAdmin() {
    this.authService.loggedIn$().subscribe(logged => {
      if(logged) {
        let user : UserDto = JSON.parse(this.authService.getUser());
        let roles = user.roles.split(" ");
        for(const role of roles) {
          if (role === "ADMIN") {
            this.admin = user;
            break;
          }
        }
      }
    });
  }

}
