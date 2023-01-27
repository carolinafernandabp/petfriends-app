import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Adoptar } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-adoptar',
  templateUrl: './adoptar.component.html',
  styleUrls: ['./adoptar.component.scss'],
})
export class AdoptarComponent implements OnInit {

  adopciones: Adoptar[] = [];

  newAdoptar: Adoptar={
    description: '',
    id: this.firestoreService.getId(),
    fecha: new Date,
    estado: 'enviada'
  }

  enableNewAdoptar = false;

  private path = 'Adoptar/';

  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router: Router) { }

  ngOnInit() {}

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  async guardarAdoptar() {
    this.presentLoading();
    const path = 'Adoptares';
    const name = this.newAdoptar.id;
    this.firestoreService.createDoc(this.newAdoptar, this.path, this.newAdoptar.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/']);
         this.presentToast('Enivado con exito');
    }).catch( error => {
       this.presentToast('no se pude guardar');
    });
}

  getAdoptar() {
    this.firestoreService.getCollection<Adoptar>(this.path).subscribe(  res => {
           this.adopciones = res;
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
