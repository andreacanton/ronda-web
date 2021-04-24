import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent implements OnInit, OnDestroy {
  public isAdmin$: Observable<boolean>;
  public routerEvents$: Subscription;
  public isCurrent: {
    users: boolean;
    recipients: boolean;
    orders: boolean;
  } = {
    users: false,
    recipients: false,
    orders: false,
  };

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin();
    this.setCurrentNavigationItem(this.router.url);
    this.routerEvents$ = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.setCurrentNavigationItem(event.url);
        }
      }
    );
  }

  private setCurrentNavigationItem(url: string): void {
    this.isCurrent.users = url.includes('/users');
    this.isCurrent.recipients = url.includes('/recipients');
    this.isCurrent.orders = url.includes('/orders');
    this.changeDetection.markForCheck();
  }

  ngOnDestroy(): void {
    this.routerEvents$.unsubscribe();
  }
  public doLogout() {
    this.authService.logout();
  }
}
