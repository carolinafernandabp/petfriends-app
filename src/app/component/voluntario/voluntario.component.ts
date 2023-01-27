import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Voluntario } from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-voluntario',
  templateUrl: './voluntario.component.html',
  styleUrls: ['./voluntario.component.scss'],
})
export class VoluntarioComponent implements OnInit {

  voluntarios: Voluntario[] = [];

  newVoluntario: Voluntario={
    description: '',
    id: this.firestoreService.getId(),
    fecha: new Date,
    estado: 'enviada'
  }

  enableNewVoluntario = false;

  private path = 'Voluntario';

  loading: any;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router: Router) { }

  ngOnInit() {}


  async guardarVoluntario() {
    this.presentLoading();
    const path = 'Voluntaro';
    const name = this.newVoluntario.id;
    this.firestoreService.createDoc(this.newVoluntario, this.path, this.newVoluntario.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/']);
         this.presentToast('Enivado con exito');
    }).catch( error => {
       this.presentToast('no se pude guardar');
    });
}

  getVoluntario() {
    this.firestoreService.getCollection<Voluntario>(this.path).subscribe(  res => {
           this.voluntarios = res;
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
