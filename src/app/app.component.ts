import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NavComponent } from './nav/nav.component';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
    <ngx-loading [show]="loading"></ngx-loading>
  `,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.isLoading.subscribe((state) => this.loading = state);
  }

}
