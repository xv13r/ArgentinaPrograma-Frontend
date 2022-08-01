import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenUtils } from '../utils/tokenUtils';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authEndpoint = environment.apiURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private sessionService: SessionService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.authEndpoint}/login`,
      {
        email,
        password,
      },
      { headers: this.headers })
  }

  register(username: string, email: string, password: string ): Observable<any> {
    return this.http.post(
      `${this.authEndpoint}/register`,
      {
        username,
        email,
        password,
      },
      { headers: this.headers })
  }

  logout(): void {
      this.sessionService.removeCurrentSession();
      this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
      return (this.sessionService.getCurrentToken() != null) ? true : false;
  };

  public isExpired(): boolean {
    const token = this.sessionService.getCurrentToken();
    if (token) {
      return TokenUtils.isTokenValid(token as string);
    }
    return false;
  }

  public getRoles() {
    const token = this.sessionService.getCurrentToken();
    if (token) {
      return TokenUtils.getRoles(token as string);
    }
    return {};
  }

  public getUserId() {
    const token = this.sessionService.getCurrentToken();
    if (token) {
      return TokenUtils.getUserId(token as string);
    }
    return {};
  }

  public getUsername() {
    const token = this.sessionService.getCurrentToken();
    if (token) {
      return TokenUtils.getUsername(token as string);
    }
    return {};
  }
}