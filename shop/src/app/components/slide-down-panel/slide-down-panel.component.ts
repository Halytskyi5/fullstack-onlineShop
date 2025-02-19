import {Component, inject, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-slide-down-panel',
  templateUrl: './slide-down-panel.component.html',
  styleUrls: ['./slide-down-panel.component.scss']
})
export class SlideDownPanelComponent {
  @Input() isVisible: boolean = false;
  router = inject(Router);
  onRegister() {
    this.router.navigateByUrl('/register')
  }

  onLogin() {
    this.router.navigateByUrl('/login')
  }
}
