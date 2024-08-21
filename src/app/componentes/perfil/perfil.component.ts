import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageCache } from '@auth0/auth0-angular';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  {

  status: "initial" | "uploading" | "success" | "fail" = "initial"; 
  file: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null; 
  images: string[] = []; 
  tag: string = '';
  imageUrls: string[] = [];
  uploadProgress: number = 0; 


  constructor(public auth: AuthService, private imageService: ImageService) {
    this.loadImages();
   }
  
  

  ngOnInit(): void {
   
  }



  // Cargar imágenes desde Firebase
  async loadImages(): Promise<void> {
    this.imageUrls = await this.imageService.getUrl();
  }


  
   //Eliminamos la imagen
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      await this.imageService.deleteImage(imageUrl, 'uploads');
      await this.loadImages(); // Recargar la lista de imágenes después de eliminar
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  
  




}
