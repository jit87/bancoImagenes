import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_ROUTING } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UploadComponent } from './componentes/upload/upload.component';
import { FotosComponent } from './componentes/fotos/fotos.component';
import { VideosComponent } from './componentes/videos/videos.component';
import { AuthModule, provideAuth0 } from '@auth0/auth0-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UploadComponent,
    FotosComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AuthModule.forRoot({
      domain: "dev-12csjvjuyvgnl25b.eu.auth0.com",
      clientId: "WKxIK678zaYDuVY4iUntwfrsCxHw3bdn",
       authorizationParams: {
         redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [ provideAuth0({
      domain: 'dev-12csjvjuyvgnl25b.eu.auth0.com',
      clientId: 'WKxIK678zaYDuVY4iUntwfrsCxHw3bdn',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })],
  bootstrap: [AppComponent]
})
export class AppModule { }
