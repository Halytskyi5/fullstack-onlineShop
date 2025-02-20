import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthDto} from "../../dtos/authDto";
import {catchError, interval, map, of, Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  subscription: Subscription;
  messageToShow: string = '';
  isVisiblePanel: boolean = false;
  textPanel: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.showPanel();
  }

  ngOnInit() {

  }

  showPanel() {
    const navigation = this.router.getCurrentNavigation();
    this.textPanel = navigation?.extras.state?.['text'] || '';
    this.isVisiblePanel = navigation?.extras.state?.['showPanel'] || false;
    this.router.navigate([], {
      replaceUrl: true,
      state: {}
    });
  }

  onSubmit() {
    let authDto: AuthDto = {
      username: this.username,
      password: this.password
    };

    this.authService.login(authDto).subscribe({
      next: response => {
        console.warn(response);
        this.authService.setUser(response);
        this.authService.setAuthToken(response.token);
        this.router.navigateByUrl('');
      },
      error: err => {
        this.messageToShow = 'error';
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
