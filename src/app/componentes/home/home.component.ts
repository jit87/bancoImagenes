import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  imageUrls: string[] = [];
  

  constructor(public auth: AuthService, private imageService: ImageService) {
    this.loadImages();
  }
  
  
  ngOnInit(): void {
   
  }


 
  // Cargar imágenes desde Firebase
  async loadImages(): Promise<void> {
    this.imageUrls = await this.imageService.getUrl();
  }





  //Descargar imagen desde Firebase
  async downloadImage(img: any) {
    this.imageService.downloadImage(img);
  }

 
  
  
  
  
  

}
