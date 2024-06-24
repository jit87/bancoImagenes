import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: any;
  


  constructor(public auth: AuthService, private imageService: ImageService) {
    this.loadImages();
  }
  
  
  ngOnInit(): void {
   
  }


   //Obtener imágenes desde el localStorage (funcion definida en el servicio imageService)
  getImages(): string[] {
    const images = this.imageService.getImages();
    return images; 
  }


  //Cargar imágenes desde el localStorage
  loadImages(): void {
    const images = this.getImages();
    this.images = images; 
  }



  //Descargar imagen desde el LocalStorage
  async downloadImage(img: any) {
    this.imageService.downloadImage(img);
  }

 
  
  
  
  
  

}
