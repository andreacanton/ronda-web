import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
