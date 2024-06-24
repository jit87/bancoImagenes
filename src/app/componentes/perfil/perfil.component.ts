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


  
   //Eliminamos la imagen en función del índice, una vez encontrado cortamos el bucle.
  deleteImage(index: number): void {
    for (var i = 0; 0 <= this.images.length; i++){
      if (i == index) {
        this.images.splice(i,1);
        localStorage.setItem('images', JSON.stringify(this.images));
        break; 
      }
    }
 }

  
  




}
