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
    this.presentLoading();
    const path = 'Fichas/';
    const name = this.newFicha.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newFicha.foto = res;
    }
    this.newFicha.userId = userId;
    this.firestoreService.createDoc(this.newFicha, this.path, this.newFicha.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/all-fichas']);
         this.presentToast('guardo con exito');
    }).catch( error => {
       this.presentToast('no se pude guardar');
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
            this.newFicha.foto = image.target?.result as string;
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
        this.newFicha.foto = dataUrl;
        // aquí subirías el blob al servidor
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }

}

}
