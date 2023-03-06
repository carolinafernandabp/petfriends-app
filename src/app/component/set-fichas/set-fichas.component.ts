import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Ficha } from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-fichas',
  templateUrl: './set-fichas.component.html',
  styleUrls: ['./set-fichas.component.scss'],
})
export class SetFichasComponent implements OnInit {

  usuarioActual: string = ''; // asignar valor

  fichas : Ficha[] = [];

  newFicha: Ficha = {

      nombre: '',
      nacimiento: new Date,
      raza: '',
      color: '',
      tamanio: '',
      description: '',
      foto: '',
      especie: [],
      estado: [],
      microChip: '',
      id: this.firestoreService.getId(),
      userId: this.usuarioActual,

  }


  enableNewFicha = false;

  private path = 'Fichas';

  newImage = '';
  newFile: any;
  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router : Router,
              public  afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.getFichas();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres`;
  }


  async guardarFicha() {
    const userId = (await this.afAuth.currentUser)?.uid;

     // Verificar si el campo título o descripción están vacíos
     if (this.newFicha.nombre=== '' || this.newFicha.description === '') {
      this.presentToastWarning('Por favor, complete todos los campos.')
      return;
    }


    this.presentLoading();
    const path = 'Fichas/';
    const name = this.newFicha.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newFicha.foto = res;
    }
    this.newFicha.userId = userId;

    if (!this.newFicha.userId) {
      this.loading.dismiss();
      this.presentToastDanger('No se pudo obtener el ID del usuario. Por favor, vuelva a iniciar sesión.');
      return;
    }

    this.firestoreService.createDoc(this.newFicha, this.path, this.newFicha.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/all-fichas']);
         this.presentToastSuccess('Guardado con exito');
    }).catch( error => {
       this.presentToastDanger('No se pudo guardar');
    });
}

  getFichas() {
    this.firestoreService.getCollection<Ficha>(this.path).subscribe(  res => {
           this.fichas = res;
    });
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async presentToastSuccess(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  async presentToastWarning(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: "warning",
    });
    toast.present();
  }

  async presentToastDanger(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  /*
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.newFicha.foto = image.target?.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
}

*/
async newImageUpload(event: any) {
  if (event.target.files && event.target.files[0]) {
    const toast = await this.loadingController.create({
      message: 'Cargando imagen...',
      duration: 3000
    });
    toast.present();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 1000;
        const maxHeight = 600;
        let scale = 4;
        if (image.width > maxWidth || image.height > maxHeight) {
          const scaleWidth = maxWidth / image.width;
          const scaleHeight = maxHeight / image.height;
          scale = Math.min(scaleWidth, scaleHeight);
        }
        const width = image.width * scale;
        const height = image.height * scale;
        const x = (maxWidth - width) / 2;
        const y = (maxHeight - height) / 2;
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const blob = await fetch(dataUrl).then((res) => res.blob());
        this.newFicha.foto = dataUrl;
        // aquí subirías el blob al servidor
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

}
