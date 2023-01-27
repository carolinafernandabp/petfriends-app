import { Component, OnInit } from '@angular/core';
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

  }


  enableNewFicha = false;

  private path = 'Fichas/';

  newImage = '';
  newFile: any;
  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router : Router) { }

  ngOnInit() {

    this.getFichas();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  async guardarFicha() {
    this.presentLoading();
    const path = 'Fichas/';
    const name = this.newFicha.nombre;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, name);
      this.newFicha.foto = res;
    }
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
}
