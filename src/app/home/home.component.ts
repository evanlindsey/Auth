import { Component } from '@angular/core';

import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-home',
  template: `
    <mat-card>
      <div id="home">
        <div *ngIf="auth.isAuthenticated; then in; else out"></div>
        <ng-template #in>
          <h1>You are logged in!</h1>
        </ng-template>
        <ng-template #out>
          <h1>Please log in or register.</h1>
        </ng-template>
      </div>
    </mat-card>
  `,
  styles: []
})
export class HomeComponent {

  constructor(public auth: AuthGuardService) { }

}
