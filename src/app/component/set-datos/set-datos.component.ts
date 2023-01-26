import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Donacion } from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-datos',
  templateUrl: './set-datos.component.html',
  styleUrls: ['./set-datos.component.scss'],
})
export class SetDatosComponent implements OnInit {

  donaciones: Donacion[] = [];

  newDonacion: Donacion ={

    nombre: '',
    rut: '',
    banco: [],
    tipo:'',
    cuenta:'',
    correo: '',
    id: this.firestoreService.getId(),

  }

  enableNewDonacion = false;

  private path = 'Donaciones/';

  loading: any;


  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router : Router) { }

  ngOnInit() {

    this.getDonaciones();
  }

  async guardarDonacion() {
    this.presentLoading();
    const path = 'Donaciones';
    const name = this.newDonacion.banco;

    this.firestoreService.createDoc(this.newDonacion, this.path, this.newDonacion.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/all-datos']);
         this.presentToast('guardo con exito');
    }).catch( error => {
       this.presentToast('no se pude guardar');
    });
}

  getDonaciones() {
    this.firestoreService.getCollection<Donacion>(this.path).subscribe(  res => {
           this.donaciones= res;
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


}
