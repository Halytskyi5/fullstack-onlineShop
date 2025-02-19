import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit() {
    // Simulate login logic
    if (this.username === 'admin' && this.password === 'password') {
      this.errorMessage = '';
      alert('Login successful!');
      // Redirect or perform other actions here
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
