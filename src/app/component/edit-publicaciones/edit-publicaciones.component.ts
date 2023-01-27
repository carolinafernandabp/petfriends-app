import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-publicaciones',
  templateUrl: './edit-publicaciones.component.html',
  styleUrls: ['./edit-publicaciones.component.scss'],
})
export class EditPublicacionesComponent implements OnInit {


  @Input() publicaciones: Publicacion[]| any ;

  publicacion:Publicacion;

  form!: FormGroup;

  loading: any;

  private path = 'Publicaciones/';

  constructor(
              public user : UserService,
              private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  firestoreService : FirestoreService,
              @Inject(NavParams) publicacion: Publicacion,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {

                this.publicacion = publicacion;

                this.form = this.fb.group({
                  titulo:[this.publicacion.titulo],
                  description:[this.publicacion.description]

                })
               }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  getPublicaciones() {
    this.firestoreService.getCollection<Publicacion>(this.path).subscribe(  res => {
           this.publicaciones = res;
    });
  }

  async editPublicacion() {

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
            const changes = this.form.value;
            console.log(this.publicacion.id);
            this.firestoreService.updateDoc(changes,'Publicaciones/',this.publicacion.id).then( res => {
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
