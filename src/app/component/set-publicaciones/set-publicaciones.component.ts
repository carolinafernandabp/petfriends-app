import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  publicaciones: Publicacion[] = [];

  newPublicacion: Publicacion ={
    titulo: '',
    description: '',
    foto: '',
    category: [],
    id: this.firestoreService.getId(),
    create: new Date
  }

  enableNewPublicacion = false;

  private path = 'Publicaciones/';

  newImage = '';
  newFile: any;
  loading: any;


  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router: Router) { }

  ngOnInit() {

    this.getPublicaciones();
  }

  async guardarPublicacion() {
    this.presentLoading();
    const path = 'Publicaciones';
    const name = this.newPublicacion.titulo;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newPublicacion.foto = res;
    }
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

}
