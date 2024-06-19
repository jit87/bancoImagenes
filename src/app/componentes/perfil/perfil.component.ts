import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageCache } from '@auth0/auth0-angular';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  {

  images: string[] = []; 


  constructor(public auth: AuthService, private imageService: ImageService) {
    this.loadImages();
   }
  

  ngOnInit(): void {
   
  }

   // Obtener imágenes desde el localStorage (funcion definida en el servicio imageService)
  getImages(): string[] {
    const images = this.imageService.getImages();
    return images; 
  }

  // Cargar imágenes desde el localStorage
  loadImages(): void {
    const images = this.getImages();
    this.images = images; 
  }







}
