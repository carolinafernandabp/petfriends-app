import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Publicacion } from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-publicaciones',
  templateUrl: './set-publicaciones.component.html',
  styleUrls: ['./set-publicaciones.component.scss'],
})
export class SetPublicacionesComponent implements OnInit {

  usuarioActual: string = ''; // asignar valor

  publicaciones: Publicacion[] = [];

  newPublicacion: Publicacion ={
    titulo: '',
    description: '',
    foto: '',
    category: [],
    id: this.firestoreService.getId(),
    create: new Date,
    userId: this.usuarioActual,
  }

  enableNewPublicacion = false;

  private path = 'Publicaciones';

  newImage = '';
  newFile: any;
  loading: any;


  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router: Router,
              public  afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.getPublicaciones();
  }

  customCounterFormatter(inputLength: number, maxLength: number, minLenght:number) {
    return `${ maxLength - inputLength} caracteres`;
  }

  async guardarPublicacion() {
    const userId = (await this.afAuth.currentUser)?.uid; // asignar valor id
    this.presentLoading();
    const path = 'Publicaciones/';
    const name = this.newPublicacion.titulo;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newPublicacion.foto = res;
    }
    this.newPublicacion.userId = userId; // asignar el valor de userId a newPublicacion
    this.firestoreService.createDoc(this.newPublicacion, this.path, this.newPublicacion.id).then( res => {
      this.loading.dismiss();
      this.router.navigate(['/']);
      this.presentToast('guardo con exito');
    }).catch( error => {
      this.presentToast('no se pude guardar');
    });
  }

  getPublicaciones() {
    this.firestoreService.getCollection<Publicacion>(this.path).subscribe(  res => {
           this.publicaciones = res;

    });
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'light',
    });
    toast.present();
  }

  /*
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.newPublicacion.foto = image.target?.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
}

*/

async newImageUpload(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 800;
        const maxHeight = maxWidth / 2; // relación de aspecto de 2:1
        let width = image.width;
        let height = image.height;
        let x = 0;
        let y = 0;
        if (width / height > 2) {
          // la imagen es más ancha de lo deseado, así que recortamos los lados izquierdo y derecho
          width = height * 2;
          x = (image.width - width) / 2;
        } else {
          // la imagen es más alta de lo deseado, así que recortamos la parte superior e inferior
          height = width / 2;
          y = (image.height - height) / 2;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(image, x, y, width, height, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const blob = await fetch(dataUrl).then((res) => res.blob());
        this.newPublicacion.foto = dataUrl;
        // aquí subirías el blob al servidor
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}



}
