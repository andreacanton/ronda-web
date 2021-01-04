import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  public getToken(): string {
    return localStorage.getItem('access_token');
  }
  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
  public resetToken(): void {
    localStorage.removeItem('access_token');
  }
}
