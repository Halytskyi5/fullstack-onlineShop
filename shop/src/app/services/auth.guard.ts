import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.loggedIn$().pipe(
    map((val: boolean) => {
      if (val) {
        return true;
      } else {
        router.navigate(['/login'],
          {
            state: {
              text: 'Для виконання цієї дії потрібно авторизуватись!',
              showPanel: true
            }
          });
        return false;
      }
    })
  );
};
