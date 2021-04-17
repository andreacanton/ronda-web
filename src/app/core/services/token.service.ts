import { Injectable } from '@angular/core';
import { formatISO, parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';
  private static TOKEN_EXPIRATION_KEY = 'token_expiration';

  constructor() {}
  public getAccessToken(): string {
    return localStorage.getItem(TokenService.ACCESS_TOKEN_KEY);
  }
  public setAccessToken(token: string): void {
    localStorage.setItem(TokenService.ACCESS_TOKEN_KEY, token);
  }
  public getRefreshToken(): string {
    return localStorage.getItem(TokenService.REFRESH_TOKEN_KEY);
  }
  public setRefreshToken(token: string): void {
    localStorage.setItem(TokenService.REFRESH_TOKEN_KEY, token);
  }

  public getExpiration(): Date {
    return parseISO(localStorage.getItem(TokenService.TOKEN_EXPIRATION_KEY));
  }
  public setExpiration(expiration: Date): void {
    localStorage.setItem(
      TokenService.TOKEN_EXPIRATION_KEY,
      formatISO(expiration)
    );
  }

  public resetTokens(): void {
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
  }
}
