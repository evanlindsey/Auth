import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  APP_KEY = 'app';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  canActivate() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  returnToApp() {
    const app = localStorage.getItem(this.APP_KEY);
    if (app !== null) {
      window.location.replace(environment.base_url + app);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.returnToApp();
  }

}
