import { Component } from '@angular/core';

import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar>
      <button mat-button routerLink="/">Home</button>
      <a mat-button href="https://github.com/evanlindsey" target="_blank">GitHub</a>
      <span style="flex: 1 1 auto;"></span>
      <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
      <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
      <button *ngIf="auth.isAuthenticated" mat-button routerLink="/user">Welcome {{auth.name}}</button>
      <button *ngIf="auth.isAuthenticated" mat-button (click)="auth.logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: []
})
export class NavComponent {

  constructor(public auth: AuthGuardService) { }

}
