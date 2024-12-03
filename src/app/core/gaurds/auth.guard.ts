import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  
  if (authService.isAuthenticated()) {  
    return true;
  }
  authService.handleAuthenticationRedirect();
  return false;
};
