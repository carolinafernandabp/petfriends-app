import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Ficha } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-edit-fichas',
  templateUrl: './edit-fichas.component.html',
  styleUrls: ['./edit-fichas.component.scss'],
})
export class EditFichasComponent implements OnInit {


  @Input()
  id!: string;
  @Input()
  nombre!: string;
  @Input()
  nacimiento!: string;
  @Input()
  raza!: string;
  @Input()
  color!: string;
  @Input()
  tamanio!: string;
  @Input()
  description!: string;
  @Input()
  especie!: string;
  @Input()
  estado!: string;
  @Input()
  microChip!: string;

  form!: FormGroup;

  loading: any;

  private path = 'Fichas';

  constructor(private modalCtrl: ModalController,
                private fb : FormBuilder,
                public  firestoreService : FirestoreService,
                public toastController: ToastController,
                public alertController: AlertController ,
                public loadingController: LoadingController) { }

  ngOnInit() {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }


  async editFicha() {

    if (!this.form) {
      console.error('Formulario no definido');
      return;
    }

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

             // verificar si form.value está definido
             if (!this.form.value) {
              console.error('Formulario sin valor');
              return;
            }
            const changes = {
              nombre: this.form.value.nombre || this.nombre,
              description: this.form.value.description|| this.description,
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
