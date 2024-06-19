import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageCache } from '@auth0/auth0-angular';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  images: any;

  constructor(public auth: AuthService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.mostrarImagenes();
  }

  mostrarImagenes() {
    const images = this.imageService.getImages();
    return images; 
  
  }









}
