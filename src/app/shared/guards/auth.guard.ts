import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const isLoggedIn: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.getIsLoggedIn()) {
    return true;
  } else {
    const router = inject(Router);
    router.navigateByUrl('/');
    return false;
  }
};

export const isCustomer: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (authService.getRole() === 'Customer') {
    return true;
  } else {
    const router = inject(Router);
    router.navigateByUrl('/');
    return false;
  }
};