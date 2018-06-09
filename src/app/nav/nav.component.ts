import { Component } from '@angular/core';

import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar>
      <a mat-button href="https://github.com/evanlindsey/Auth" target="_blank">GitHub</a>
      <span style="flex: 1 1 auto;"></span>
      <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login" skipLocationChange>Login</button>
      <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register" skipLocationChange>Register</button>
      <button *ngIf="auth.isAuthenticated" mat-button routerLink="/user">Welcome {{auth.name}}</button>
      <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: []
})
export class NavComponent {

  constructor(public auth: AuthGuardService) { }

}
