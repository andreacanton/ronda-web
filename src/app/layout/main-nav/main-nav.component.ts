import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  constructor(private authService: AuthService) {}

  public isAdmin(): Observable<boolean> {
    return this.authService.isAdmin();
  }
  public doLogout() {
    this.authService.logout();
  }
}
