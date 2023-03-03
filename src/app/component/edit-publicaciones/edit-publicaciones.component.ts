import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-publicaciones',
  templateUrl: './edit-publicaciones.component.html',
  styleUrls: ['./edit-publicaciones.component.scss'],
})
export class EditPublicacionesComponent implements OnInit {


  //@Input() publicaciones!: Publicacion;

  @Input()
  id!: string;
  @Input()
  foto!: string;
  @Input()
  titulo!: string;
  @Input()
  description!: string;
  @Input()
  category!: string;

  form!: FormGroup;

  loading: any;

  private path = 'Publicaciones';

  constructor(
              public user : UserService,
              private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  firestoreService : FirestoreService,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {


               }

  ngOnInit() {

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      description: ['', Validators.required],
    });

  }


  dismissModal(){
    this.modalCtrl.dismiss();

  }

  async editPublicacion() {
    // verificar si form está definido
    if (!this.form) {
      console.error('Formulario no definido');
      return;
    }

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>EDITAR</strong> esta publicacion',
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
              titulo: this.form.value.titulo || this.titulo,
              description: this.form.value.description || this.description,
              // Añade el resto de los campos que quieres editar
            };

            console.log(this.id);
            this.firestoreService.updateDoc(changes, this.path, this.id).then( res => {
              this.presentToast('Editado con éxito');
              this.alertController.dismiss(changes);
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
