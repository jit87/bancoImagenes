import { Component } from '@angular/core';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Estado inicial del proceso de carga
  file: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null; 
  images: string[] = []; 
base64Image: any;


  constructor(public imageService: ImageService) {
    this.loadImages();
  }


  ngOnInit(): void { }
  


  // Manejar la selección de archivo por parte del usuario
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
        // Guardar la imagen en el localStorage
        this.saveImage(reader.result as string); 
      };
      //Leer el archivo como una URL de datos
      reader.readAsDataURL(this.file); 
    }
  }


  

  // Guardar imagen en el localStorage
  saveImage(image: string): void {
    const images = this.getImages();
    images.push(image);
    // Guardar la lista actualizada de imágenes en el localStorage
    localStorage.setItem('images', JSON.stringify(images)); 
    // Volver a cargar las imágenes guardadas
    this.loadImages(); 
  }



  // Cargar imágenes desde el localStorage
  loadImages(): void {
    const images = this.getImages();
    // Actualizar la lista de imágenes en el componente
    this.images = images; 
  }



  // Obtener imágenes desde el localStorage (funcion definida en el servicio imageService)
  getImages(): string[] {
    const images = this.imageService.getImages();
    // Devolver la lista de imágenes o una lista vacía si no hay imágenes guardadas
    return images; 
  }



  // Simulación de subida de archivo
  onUpload(): void {
    if (this.file) {
      this.status = 'uploading';
      setTimeout(() => {
        this.status = 'success'; 
      }, 1000); 
    }
  }





}
