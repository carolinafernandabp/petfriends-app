import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  usuarioActual: string = ''; // asignar valor
  publicacionActual: string = '';

  voluntarios: Voluntario[] = [];

  newVoluntario: Voluntario={
    description: '',
    id: this.firestoreService.getId(),
    fecha: new Date,
    estado: 'enviada',
    userId: this.usuarioActual,
    publicacionId: this.publicacionActual
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
              private router: Router,
              public  afAuth: AngularFireAuth) { }

  ngOnInit() {

    this.getVoluntario();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }



  async guardarVoluntario() {

    const userId = (await this.afAuth.currentUser)?.uid;
    if (this.newVoluntario.description === '') {
      this.presentToastWarning('Por favor, complete todos los campos.')
      return;
    }

    this.presentLoading();
    const path = 'Voluntaro';
    const name = this.newVoluntario.id;

    this.newVoluntario.userId = userId;

    if (!this.newVoluntario.userId) {
      this.loading.dismiss();
      this.presentToastDanger('No se pudo obtener el ID del usuario. Por favor, vuelva a iniciar sesión.');
      return;
    }


    this.firestoreService.createDoc(this.newVoluntario, this.path, this.newVoluntario.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/']);
         this.presentToastSuccess('Enviado con éxito');
    }).catch( error => {
       this.presentToastDanger('No se pudo enviar');
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


}
