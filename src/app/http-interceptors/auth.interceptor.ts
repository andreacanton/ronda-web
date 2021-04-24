import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth/refresh')) {
      return next.handle(request);
    }
    return this.authService.isLoggedIn().pipe(
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          request.headers.append(
            'Authorization',
            `Bearer ${this.tokenService.getAccessToken()}`
          );
        }
        return next.handle(request);
      })
    );
  }
}
