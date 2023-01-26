import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Ficha } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-edit-fichas',
  templateUrl: './edit-fichas.component.html',
  styleUrls: ['./edit-fichas.component.scss'],
})
export class EditFichasComponent implements OnInit {



  ficha!: Ficha;

  form!: FormGroup;

  loading: any;

  constructor(private modalCtrl: ModalController,
                private fb : FormBuilder,
                public  firestoreService : FirestoreService,
                @Inject(NavParams) ficha : Ficha,
                public toastController: ToastController,
                public alertController: AlertController ,
                public loadingController: LoadingController) {

                  this.ficha = ficha;

                  this.form = this.fb.group({
                    nombre:[this.ficha.nombre],
                    description:[this.ficha.description]

                  })
                 }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  async editFicha() {

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>EDITAR</strong> esta ficha',
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
            this.firestoreService.updateDoc(changes,'Fichas/',this.ficha.id).then( res => {
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
