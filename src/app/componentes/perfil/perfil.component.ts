import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  constructor(public auth: AuthService) { }

  images = [
    {
      src: 'https://via.placeholder.com/350x250',
    },
    {
      src: 'https://via.placeholder.com/350x250',   
    },
    {
      src: 'https://via.placeholder.com/350x250',
    }
    
  ];

}
