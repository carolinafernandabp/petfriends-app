import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Donacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-edit-datos',
  templateUrl: './edit-datos.component.html',
  styleUrls: ['./edit-datos.component.scss'],
})
export class EditDatosComponent implements OnInit {

  @Input()
  id!: string;
  @Input()
  nombre!: string;
  @Input()
  rut!: string;
  @Input()
  banco!: string;
  @Input()
  tipo!: string;
  @Input()
  foto!: string;
  @Input()
  cuenta!: string;
  @Input()
  correo!: string;


  form!: FormGroup;

  loading: any;

  private path = 'Donaciones';

  constructor(private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  firestoreService : FirestoreService,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {

               }

  ngOnInit() {

      this.form = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  async editDonacion() {

     if (!this.form) {
      console.error('Formulario no definido');
      return;
    }

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

            console.log('Confirm Okay');
            // verificar si form.value está definido
            if (!this.form.value) {
              console.error('Formulario sin valor');
              return;
            }
            const changes = {
              nombre: this.form.value.nombre || this.nombre,
              rut: this.form.value.rut|| this.rut,
              // Añade el resto de los campos que quieres editar
            };
            console.log(this.id);
            this.firestoreService.updateDoc(changes,this.path,this.id).then( res => {
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
