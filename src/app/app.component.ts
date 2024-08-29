import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bancoImagenes';

  constructor(public auth: AuthService) { 
    console.log("NOTA: esta app está diseñada para probarse en el puerto 4200, si no no funciona bien por la política CORS")
  }
  


}
