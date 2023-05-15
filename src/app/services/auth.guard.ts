import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('isLoggedIn');

  return authService.isLoggedIn().pipe(
    take(1),
    tap((isLoggedIn) => {
      console.log(isLoggedIn);
      isLoggedIn ? true : router.navigate(['/login']);
    })
  );
};
