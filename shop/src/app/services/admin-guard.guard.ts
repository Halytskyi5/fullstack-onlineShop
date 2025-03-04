import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let result : boolean = false;
  authService.loggedIn$().subscribe(logged => {
    if (logged) {
      let user = JSON.parse(authService.getUser());
      let roles = user.roles.split(" ");
      for(const role of  roles) {
        if (role === "ADMIN") {
          result = true;
          break;
        }
      }
    }
  });
  if (!result) {
    router.navigate([''])
  }
  return result;
};
