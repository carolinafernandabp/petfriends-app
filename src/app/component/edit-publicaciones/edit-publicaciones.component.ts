import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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


  @Input()
  titulo!: string;
  @Input()
  id!: string;
  @Input()
  description!: string;

  publicaciones!: Publicacion;

  form!: FormGroup;

  loading: any;

  private path = 'Publicaciones';

  constructor(
              public user : UserService,
              private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  firestoreService : FirestoreService,
              @Inject(NavParams) publicacion: Publicacion,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {

                this.publicaciones = publicacion;

                this.form = this.fb.group({
                  titulo:[this.titulo],
                  description:[this.description]

                })
               }

  ngOnInit() {

    this.firestoreService.getDoc<Publicacion>('Publicaciones', this.publicaciones.id)
    .pipe(map(document => this.publicaciones.id))
    .subscribe(id => {
      console.log(id);
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss();

  }


  save() {

    const changes = this.form.value;

    this.firestoreService.updateDoc(changes,this.path,this.publicaciones.id).then( () => {

      this.alertController.dismiss(changes);
      this.modalCtrl.dismiss();

    });


}

/*
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
            console.log(this.publicaciones.id);
            this.firestoreService.updateDoc(changes,this.path,this.publicaciones.id).then( res => {
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
*/
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
