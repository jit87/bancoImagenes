import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: string[] = []; 

  constructor(private http: HttpClient) { }
  

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    //Sustituir por la dirección del backend
    return this.http.post("https://httpbin.org/post", formData); 
  }



  addImage(imageUrl: string): void {
    this.images.push(imageUrl);
  }


  
  //Guardar imagen en el LocalStorage
  saveImage(images: string[]) {
     localStorage.setItem('images', JSON.stringify(images)); 
  }


  // Obtener imágenes desde el localStorage
  getImages(): string[] {
    const images = localStorage.getItem('images');
    // Devolver la lista de imágenes o una lista vacía si no hay imágenes guardadas
    return images ? JSON.parse(images) : []; 
  }








  
}
