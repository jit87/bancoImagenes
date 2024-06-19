import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(public auth: AuthService, @Inject(DOCUMENT) private document: Document) { }

  onLinkClick(event: Event) {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        event.preventDefault();
        alert('Debe estar autenticado para acceder a este enlace.');
      } else {
        window.location.href = 'upload';
      }
    });
  }
  

}
