import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NavComponent } from './nav/nav.component';

import { AppService } from './services/app.service';

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

  constructor(private app: AppService) { }

  ngOnInit() {
    this.app.isLoading.subscribe((state) => this.loading = state);
  }

}