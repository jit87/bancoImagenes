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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UploadComponent,
    FotosComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
