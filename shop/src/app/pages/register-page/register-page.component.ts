import { Component } from '@angular/core';
import {AuthDto} from "../../dtos/authDto";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  username: string = '';
  //email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  constructor(private authService : AuthService, private router : Router) {
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Паролі не співпадають!';
      return;
    }
    let authDto : AuthDto = {
      username : this.username,
      password : this.password
    };
    this.authService.register(authDto).subscribe({
      next: val => {
      this.authService.setUser(val);
      this.authService.setAuthToken(val.token);
      this.router.navigateByUrl('');
    }, error: err => {
        this.errorMessage = 'Користувач з таким логіном вже існує!';
      }
    });
    this.errorMessage = '';
  }
}
