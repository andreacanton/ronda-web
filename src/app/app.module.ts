import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ENVIRONMENT } from 'src/environments/environment.token';
import { environment } from 'src/environments/environment';
import { SharedModule } from '@shared/shared.module';
import { UsersModule } from './user/users.module';
import { MainNavComponent } from './components/main-nav.component';

const MaterialModules = [
  MatCommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
];
@NgModule({
  declarations: [AppComponent, MainNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ...MaterialModules,
    UsersModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
