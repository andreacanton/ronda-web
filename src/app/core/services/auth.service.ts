import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiClient } from './api.client';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/data/schema/user';
import { JwtPayload } from '@core/interfaces/jwt-payload';
import { LoginResponse } from '@core/interfaces/login-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly apiClient: ApiClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly tokenService: TokenService
  ) {}

  public login(identity: string, password: string): Observable<LoginResponse> {
    return this.apiClient
      .post<{ access_token: string; refresh_token: string }>('auth/login', {
        identity,
        password,
      })
      .pipe(
        map((response) => {
          this.tokenService.setAccessToken(response.access_token);
          this.tokenService.setRefreshToken(response.refresh_token);
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

  public logout() {
    this.tokenService.resetTokens();
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

  public isLoggedIn(): boolean {
    return this.getUserInfo() !== null;
  }
}
