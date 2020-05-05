import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

/**
 * Checking if their is a token in localstorage and if required redirecting the user.
 */

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
  
}