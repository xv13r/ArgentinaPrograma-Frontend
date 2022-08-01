import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RoutingModule } from './features/routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';

import { AuthInterceptorProviders } from './core/interceptor/auth.interceptor';
import { ErrorInterceptorProvider } from './core/interceptor/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    CoreModule,
    SharedModule,
    FeaturesModule
  ],
  providers: [
    AuthInterceptorProviders,
    ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }