import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UploadComponent } from './upload/upload.component';
import { APP_ROUTING } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    PerfilComponent,
    SpinnerComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    APP_ROUTING,
    HttpClientModule
  ],
  exports: [
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    PerfilComponent,
    SpinnerComponent,
    UploadComponent
  ],
  
})
export class ComponentesModule { }
