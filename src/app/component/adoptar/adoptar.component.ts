import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Adoptar} from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Publicacion} from '../../models/models';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-adoptar',
  templateUrl: './adoptar.component.html',
  styleUrls: ['./adoptar.component.scss'],
})
export class AdoptarComponent implements OnInit {


  usuarioActual: string = ''; // asignar valor
  publicacionActual: string = '';

  adopciones: Adoptar[] = [];

  newAdoptar: Adoptar={
    description: '',
    id: this.firestoreService.getId(),
    fecha: new Date,
    estado: 'enviada',
    userId: this.usuarioActual,
    publicacionId: this.publicacionActual


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
              private router: Router,
              public  afAuth: AngularFireAuth) {

              }

  ngOnInit() {

    this.getAdoptar();
  }


  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }


  async guardarAdoptar( ) {

   const userId = (await this.afAuth.currentUser)?.uid;
    if (this.newAdoptar.description === '') {
      this.presentToastWarning('Por favor, complete todos los campos.')
      return;
    }

    this.presentLoading();
    const path = 'Adoptar';
    const name = this.newAdoptar.id;

   this.newAdoptar.userId = userId;

    if (!this.newAdoptar.userId) {
      this.loading.dismiss();
      this.presentToastDanger('No se pudo obtener el ID del usuario. Por favor, vuelva a iniciar sesión.');
      return;
    }

    this.firestoreService.createDoc(this.newAdoptar, this.path, this.newAdoptar.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/']);
         this.presentToastSuccess('Enviado con éxito');
    }).catch( error => {
       this.presentToastDanger('No se pudo enviar');
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
