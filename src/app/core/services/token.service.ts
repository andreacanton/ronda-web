import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private static ACCESS_TOKEN_KEY = 'access_token';
  private static REFRESH_TOKEN_KEY = 'refresh_token';

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

  public resetTokens(): void {
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
  }
}
