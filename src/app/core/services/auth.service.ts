import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiClient } from './api.client';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/data/schema/user';
import { JwtPayload } from '@core/interfaces/jwt-payload';
import { LoginResponse } from '@core/interfaces/login-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';
import { parse } from 'date-fns';
import { Router } from '@angular/router';
import { TokenResponse } from '@core/interfaces/token-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(
    private readonly apiClient: ApiClient,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  public login(identity: string, password: string): Observable<LoginResponse> {
    return this.apiClient
      .post<TokenResponse>('auth/login', {
        identity,
        password,
      })
      .pipe(
        map((response) => {
          this.setTokens(response);
          return {
            success: true,
            errors: null,
          };
        }),
        catchError((errors) => {
          return of({
            success: false,
            errors,
          });
        })
      );
  }

  public async logout() {
    this.tokenService.resetTokens();
    await this.router.navigate(['/auth/login']);
  }

  public getUserInfo(): User {
    try {
      const payload = this.jwtHelper.decodeToken<JwtPayload>(
        this.tokenService.getAccessToken()
      );
      return {
        userId: payload.sub,
        memberNumber: payload.memberNumber,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        role: payload.role,
      } as User;
    } catch (error: any) {
      return null;
    }
  }

  public refreshToken(): Observable<TokenResponse> {
    return this.apiClient
      .post<TokenResponse>('auth/refresh', {
        refreshToken: this.tokenService.getRefreshToken(),
      })
      .pipe(
        map((response) => {
          this.setTokens(response);
          return response;
        }),
        catchError((errors) => {
          this.logout();
          return of(null);
        })
      );
  }

  private setTokens(response: TokenResponse): void {
    const { access_token, refresh_token } = response;
    const payload = this.jwtHelper.decodeToken<JwtPayload>(access_token);
    this.tokenService.setExpiration(
      parse(payload.exp.toString(), 't', new Date())
    );
    this.tokenService.setAccessToken(access_token);
    this.tokenService.setRefreshToken(refresh_token);
  }

  public getAccessToken(): Observable<string> {
    if (this.tokenService.isExpired()) {
      return this.refreshToken().pipe(
        map((response) => {
          return response.access_token;
        })
      );
    } else {
      return of(this.tokenService.getAccessToken());
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.getAccessToken().pipe(map((token) => !!token));
  }

  public isAdmin(): Observable<boolean> {
    return this.isLoggedIn().pipe(
      map((isLoggedIn) => {
        const user = this.getUserInfo();
        return isLoggedIn && user.role === 'admin';
      })
    );
  }
}
