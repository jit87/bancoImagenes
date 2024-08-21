import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'firebase/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, ref,listAll, getDownloadURL } from "firebase/storage";




@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: string[] = []; 



  constructor(private http: HttpClient, private storage: AngularFireStorage, private firestore: AngularFirestore) { }
  


  saveImage(images: string[], collectionName: string) {
   // localStorage.setItem('images', JSON.stringify(images)); 
    
      images.forEach((image, index) => {
          const filePath = `uploads/image_${index + 1}.jpg`; 
          const blob = this.base64ToBlob(image, 'image/jpeg');
          const fileRef = this.storage.ref(filePath); 
          const task = this.storage.upload(filePath, blob);

          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                console.log('Imagen subida con éxito:', url);
                //Guardamos la referencia en Firestore
                this.saveToFirestore(url, collectionName);
              });
            })
          ).subscribe();
    });
  }



  private saveToFirestore(url: string, collectionName: string) {
    this.firestore.collection(collectionName).add({ imageUrl: url })
      .then(() => {
        console.log('URL almacenada en Firestore con éxito');
      })
      .catch(error => {
        console.error('Error al almacenar la URL en Firestore:', error);
      });
  }


  // Obtener imágenes desde el localStorage
  getImages(): string[] {
    const images = localStorage.getItem('images');
    
      // Initialize Firebase Storage
    const storage = getStorage();
  
    const imagesRef = ref(storage, 'uploads/');

    // Lista todos los elementos en el directorio 'uploads/'
    const listResult = listAll(imagesRef);

    console.log(listResult); 
    
  
    return images ? JSON.parse(images) : []; 
  }


  


  //Descargar imagen desde el LocalStorage
  async downloadImage(img: any) {
    const image = await fetch(img)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'image' + imageURL; 
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


  
 base64ToBlob(base64: string, contentType: string): Blob {
   const byteCharacters = atob(base64.split(',')[1]);
   const byteNumbers = new Array(byteCharacters.length);
   
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
   
   const byteArray = new Uint8Array(byteNumbers);
   return new Blob([byteArray], { type: contentType });
   
}







  
}
