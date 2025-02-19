import { Component } from '@angular/core';
import {AuthDto} from "../../dtos/authDto";
import {AuthService} from "../../services/auth.service";

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
  private authDto : AuthDto;
  constructor(private authService : AuthService) {
  }

  onSubmit() {
    // Simulate registration logic
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authDto = {
      username : this.username,
      password : this.password
    };

    // Simulate successful registration
    this.errorMessage = '';
    alert('Registration successful!');
    // Redirect or perform other actions here
  }
}
