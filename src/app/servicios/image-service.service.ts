import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private storage: AngularFireStorage, private firestore: AngularFirestore) { }



  // Guardar la imagen en Firebase Storage
  async saveImage(file: File, collectionName: string, progressCallback: (progress: number) => void): Promise<void> {
    const timestamp = new Date().getTime();
    const uniqueFileName = `image_${timestamp}_${file.name}`;
    const filePath = `uploads/${uniqueFileName}`;
    const fileRef = ref(getStorage(), filePath);

    return new Promise<void>((resolve, reject) => {
      // Subir el archivo
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Obtener el progreso de la subida
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressCallback(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          reject(error);
        },
        async () => {
          // La subida ha finalizado
          try {
            const url = await getDownloadURL(fileRef);
            console.log('Imagen subida con éxito:', url);
            await this.saveToFirestore(url, collectionName);
            resolve();
          } catch (error) {
            console.error('Error getting download URL:', error);
            reject(error);
          }
        }
      );
    });
  }




  // Guardar la referencia de la imagen en Firestore
  private async saveToFirestore(url: string, collectionName: string): Promise<void> {
    try {
      await this.firestore.collection(collectionName).add({ imageUrl: url });
      console.log('URL almacenada en Firestore con éxito');
    } catch (error) {
      console.error('Error al almacenar la URL en Firestore:', error);
      throw error;
    }
  }




  

  // Obtener URLs de las imágenes desde Firebase Storage
  async getUrl(): Promise<string[]> {
    const storage = getStorage();
    const imagesRef = ref(storage, 'uploads/');
    const urls: string[] = [];

    try {
      const listResult = await listAll(imagesRef);

      for (const itemRef of listResult.items) {
        const url = await getDownloadURL(itemRef);
        urls.push(url);
      }

      return urls;
    } catch (error) {
      console.error('Error getting URLs:', error);
      return [];
    }
  }



  
   
  async downloadImage(imageUrl: string, imageName: string = 'image'): Promise<void> {
    try {
        // Obtén la imagen desde la URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Error fetching the image.');
        }

        // Convierte la respuesta a un blob
        const imageBlob = await response.blob();
        
        // Crea un objeto URL para el blob
        const imageObjectURL = URL.createObjectURL(imageBlob);

        // Crea un enlace temporal para la descarga
        const link = document.createElement('a');
        link.href = imageObjectURL;
        // Usa el nombre de la imagen proporcionado o un nombre por defecto
        link.download = `${imageName}.jpg`; 

        // Adjunta el enlace al documento, haz clic en él, luego elimínalo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoca el objeto URL para liberar memoria
        URL.revokeObjectURL(imageObjectURL);

    } catch (error) {
        console.error('Error downloading image:', error);
    }
}
  
  
  
  
  // Eliminar una imagen de Firebase Storage y Firestore
  async deleteImage(imageUrl: string, collectionName: string): Promise<void> {
    const storage = getStorage();
    const fileRef = ref(storage, imageUrl);

    try {
      // Mostrar el diálogo de confirmación usando SweetAlert2
      const result = await Swal.fire({
        title: '¿Quieres eliminar esta imagen?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      });

      if (result.isConfirmed) {
        // Eliminar la imagen del Storage
        await deleteObject(fileRef);

        // Eliminar la imagen de Firestore
        const querySnapshot = await this.firestore.collection(collectionName).ref.where('imageUrl', '==', imageUrl).get();
        querySnapshot.forEach(async (doc) => {
          await this.firestore.collection(collectionName).doc(doc.id).delete();
        });

        // Mostrar un mensaje de éxito
        await Swal.fire(
          'Eliminado!',
          'La imagen ha sido eliminada.',
          'success'
        );

        console.log('Imagen eliminada con éxito');
      } 
    } catch (error) {
      console.error('Error deleting image:', error);
      await Swal.fire(
        'Error',
        'Ocurrió un error al eliminar la imagen.',
        'error'
      );
    }
  }
  
  


  
  
  
}
