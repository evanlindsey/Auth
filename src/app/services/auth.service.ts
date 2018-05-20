import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AuthService {

  isLoading: EventEmitter<boolean> = new EventEmitter(true);

  private AUTH_ENDPOINT = environment.api_url + 'api/auth';

  user = {
    firstName: '',
    lastName: ''
  };

  constructor(private authGuard: AuthGuardService, private http: Http, private sb: MatSnackBar, private router: Router) { }

  get tokenHeader() {
    let header = new Headers;
    header = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem(this.authGuard.TOKEN_KEY) });
    return new RequestOptions({ headers: header });
  }

  private handleError(error) {
    this.isLoading.emit(false);
    this.sb.open(error, 'close');
  }

  private authenticate(res) {
    const authResponse = res.json();
    if (!authResponse.token) {
      return;
    }
    localStorage.setItem(this.authGuard.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.authGuard.NAME_KEY, authResponse.firstName);
    this.authGuard.returnToApp();
  }

  private authRequest(endpoint, payload) {
    this.isLoading.emit(true);
    this.http.post(this.AUTH_ENDPOINT + endpoint, payload).subscribe(res => {
      this.isLoading.emit(false);
      this.authenticate(res);
    }, error => {
      this.handleError(error.statusText);
    });
  }

  register(userData) {
    delete userData.confirmPassword;
    this.authRequest('/register', userData);
  }

  login(loginData) {
    this.authRequest('/login', loginData);
  }

  getUser() {
    this.isLoading.emit(true);
    this.http.get(this.AUTH_ENDPOINT + '/me', this.tokenHeader).pipe(map(res => res.json())).subscribe(res => {
      this.isLoading.emit(false);
      this.user.firstName = res.firstName;
      this.user.lastName = res.lastName;
    }, error => {
      this.handleError(error.statusText);
    });
  }

  updateUser() {
    this.isLoading.emit(true);
    this.http.put(this.AUTH_ENDPOINT + '/update', this.user, this.tokenHeader).pipe(map(res => res.json())).subscribe(res => {
      this.isLoading.emit(false);
      localStorage.setItem(this.authGuard.NAME_KEY, res.firstName);
    }, error => {
      this.handleError(error.statusText);
    });
  }

  emailValid() {
    return control => {
      const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regex.test(control.value) ? null : { invalidEmail: true };
    };
  }

}
