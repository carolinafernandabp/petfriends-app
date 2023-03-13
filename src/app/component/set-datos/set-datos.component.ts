import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Donacion } from 'src/app/models/models';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { validate } from 'rut.js';

@Component({
  selector: 'app-set-datos',
  templateUrl: './set-datos.component.html',
  styleUrls: ['./set-datos.component.scss'],
})
export class SetDatosComponent implements OnInit {

  usuarioActual: string = ''; // asignar valor

  donaciones: Donacion[] = [];

  newDonacion: Donacion ={
    nombre: '',
    rut: '',
    banco: [],
    tipo: [],
    cuenta: 0,
    correo: '',
    id: this.firestoreService.getId(),
    userId: this.usuarioActual,
  }

  enableNewDonacion = false;

  private path = 'Donaciones/';

  loading: any;

  public showRutError = false;

  constructor(public menucontroler: MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService,
              private router : Router,
              public  afAuth: AngularFireAuth,
              private fb: FormBuilder) {  }

  ngOnInit() {

    this.getDonaciones();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres`;
  }

  // Función para verificar si el correo electrónico es válido
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }

  async guardarDonacion() {
    const userId = (await this.afAuth.currentUser)?.uid; // asignar valor id

     // Verificar si campo vacíos
     if (this.newDonacion.nombre === '' || this.newDonacion.banco.length === 0 || this.newDonacion.tipo.length === 0 ) {
      this.presentToastWarning('Por favor, complete todos los campos.')
      return;
    }

    //verificar rut
    if (this.newDonacion.rut === '' || !validate(this.newDonacion.rut)) {
      this.presentToastWarning('Por favor, ingrese un RUT válido.');
      this.showRutError = true;
      return;
    }
    this.showRutError = false;

    //verificar correo
    if (this.newDonacion.correo === '' || !this.isValidEmail(this.newDonacion.correo)) {
    this.presentToastWarning('Por favor, ingrese un correo válido.')
    return;
  }

  //verificar cuenta
  if ( isNaN(Number(this.newDonacion.cuenta))) {
    this.presentToastWarning('El número de cuenta debe ser numérico.');
    return;
  }


    this.presentLoading();
    const path = 'Donaciones';
    const name = this.newDonacion.banco;

    this.newDonacion.userId = userId; // asignar el valor de userId a donacion

    if (!this.newDonacion.userId) {
      this.loading.dismiss();
      this.presentToastDanger('No se pudo obtener el ID del usuario. Por favor, vuelva a iniciar sesión.');
      return;
    }

    this.firestoreService.createDoc(this.newDonacion, this.path, this.newDonacion.id).then( res => {
         this.loading.dismiss();
         this.router.navigate(['/all-donar']);
         this.presentToastSuccess('Guardado con éxito');
    }).catch( error => {
       this.presentToastDanger('No se pudo guardar');
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
