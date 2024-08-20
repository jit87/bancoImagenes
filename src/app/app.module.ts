import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';



import { APP_ROUTING } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UploadComponent } from './componentes/upload/upload.component';
import { AuthModule, provideAuth0 } from '@auth0/auth0-angular';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './componentes/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UploadComponent,
    PerfilComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule.forRoot({
      domain: "dev-12csjvjuyvgnl25b.eu.auth0.com",
      clientId: "WKxIK678zaYDuVY4iUntwfrsCxHw3bdn",
       authorizationParams: {
         redirect_uri: window.location.origin
      }
    })
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
