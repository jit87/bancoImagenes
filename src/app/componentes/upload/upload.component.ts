import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/servicios/image-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {



  status: "initial" | "uploading" | "success" | "fail" = "initial"; 
  file: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null; 
  images: string[] = []; 
  tag: string = '';
  imageUrls: string[] = [];
  uploadProgress: number = 0; 



  constructor(public imageService: ImageService) {}



  ngOnInit(): void {
    this.loadImages();
  }




  // Manejar la selección de archivo por parte del usuario
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      // Leer el archivo como una URL de datos
      reader.readAsDataURL(this.file); 
    }
  }





  // Subir el archivo y actualizar la lista de imágenes
  async onUpload(): Promise<void> {
    if (this.file) {
      this.status = 'uploading';
      try {
        await this.imageService.saveImage(this.file, 'uploads', (progress) => {
          this.uploadProgress = progress;
        });
        this.status = 'success';
        this.imagePreview = null;
        this.file = null;
        this.loadImages();
      } catch (error) {
        console.error('Error saving image:', error);
        this.status = 'fail';
      }
    }
  }




  // Cargar imágenes desde Firebase
  async loadImages(): Promise<void> {
    this.imageUrls = await this.imageService.getUrl();
  }









}
