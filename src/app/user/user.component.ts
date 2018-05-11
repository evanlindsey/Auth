import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  template: `
    <mat-card class="card">
      <h1>Edit Info</h1>
      <div class="field-container">
        <mat-form-field>
          <input matInput [(ngModel)]="auth.user.firstName" placeholder="First Name">
        </mat-form-field>
        <br />
        <mat-form-field>
          <input matInput [(ngModel)]="auth.user.lastName" placeholder="Last Name">
        </mat-form-field>
        <button mat-raised-button color="primary" (click)="updateUser()">Save Changes</button>
      </div>
    </mat-card>
  `,
  styles: []
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser();
  }

  updateUser() {
    this.auth.updateUser();
  }

}
