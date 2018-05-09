import { Component } from '@angular/core';

import { AppService } from '../services/app.service';

@Component({
  selector: 'app-nav',
  template: `
    <mat-toolbar>
      <button mat-button routerLink="/">Home</button>
      <a mat-button href="https://github.com/evanlindsey" target="_blank">GitHub</a>
      <span style="flex: 1 1 auto;"></span>
      <button *ngIf="!app.isAuthenticated" mat-button routerLink="/login">Login</button>
      <button *ngIf="!app.isAuthenticated" mat-button routerLink="/register">Register</button>
      <button *ngIf="app.isAuthenticated" mat-button routerLink="/user">Welcome {{app.name}}</button>
      <button *ngIf="app.isAuthenticated" mat-button (click)="app.logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: []
})
export class NavComponent {

  constructor(public app: AppService) { }

}
