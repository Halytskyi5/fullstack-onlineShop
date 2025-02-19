import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthDto} from "../../dtos/authDto";
import {catchError, interval, map, of, Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  messageToShow: string = '';
  constructor(private authService : AuthService, private router : Router) {
  }
  subscription : Subscription;

  onSubmit() {
    let authDto : AuthDto = {
      username: this.username,
      password: this.password
    };

    this.subscription = this.authService.login(authDto).subscribe({
      next: response => {
        console.warn(response);
        this.authService.setUser(response);
        this.authService.setAuthToken(response.token);
        this.router.navigateByUrl('');
      },
      error: err => {
        this.messageToShow = 'error';
      }, complete: () => {
        this.subscription.unsubscribe();
        console.log('end');
      }
    });

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
