import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
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
  banco!: [];
  @Input()
  tipo!: [];
  @Input()
  cuenta!: string;
  @Input()
  correo!: string;


  public showRutError = false;

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
      banco: [[], Validators.required],
      tipo: [[], Validators.required],
      cuenta: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  customCounterFormatter(inputLength: number, maxLength: number, minLenght:number) {
    return `${ maxLength - inputLength} caracteres`;
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
              rut: this.form.value.rut || this.rut,
              banco: this.form.value.banco || this.banco,
              tipo: this.form.value.tipo|| this.tipo,
              cuenta: this.form.value.cuenta || this.cuenta,
              correo: this.form.value.correo || this.correo,
            };


              // Verificar si campo vacíos
            if (this.form.value.banco.length === 0 ) {
              this.presentToastWarning('Por favor, Re- ingrese Nombre del banco ')
              return;
            }

            if ( this.form.value.tipo.length === 0 ) {
              this.presentToastWarning('Por favor, Re- ingrese el tipo de cuenta ')
              return;
            }

            //verificar cuenta
            if ( isNaN(Number(this.form.value.cuenta))) {
              this.presentToastWarning('El número de cuenta debe ser numérico.');
              return;
            }


            console.log(this.id);
            this.firestoreService.updateDoc(changes,this.path,this.id).then( res => {
              this.presentToastSuccess('Editado con éxito');
              this.alertController.dismiss();
              this.modalCtrl.dismiss();
            }).catch( error => {
                this.presentToastDanger('No se pudo editar');
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
