import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Donacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-edit-datos',
  templateUrl: './edit-datos.component.html',
  styleUrls: ['./edit-datos.component.scss'],
})
export class EditDatosComponent implements OnInit {

  @Input() donaciones: Donacion[]| any ;


  donacion!: Donacion;

  form!: FormGroup;

  loading: any;

  constructor(private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  firestoreService : FirestoreService,
              @Inject(NavParams) donacion : Donacion,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {

                this.donacion = donacion;

                this.form = this.fb.group({
                  nombre:[this.donacion.nombre],
                  rut:[this.donacion.rut],
                  banco:[this.donacion.banco],
                  tipo:[this.donacion.tipo],
                  cuenta: [this.donacion.cuenta],
                  correo:[this.donacion.correo]

                })
               }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  async editDonacion() {

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>EDITAR</strong> los datos',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'normal',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            // this.alertController.dismiss();
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
            const changes = this.form.value;
            this.firestoreService.updateDoc(changes,'Donaciones/',this.donacion.id).then( res => {
              this.presentToast('Editado con éxito');
              this.alertController.dismiss();
              this.modalCtrl.dismiss();
            }).catch( error => {
                this.presentToast('No se pudo editar');
                this.modalCtrl.dismiss();
            });
          }
        }
      ]
    });
    await alert.present();
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
