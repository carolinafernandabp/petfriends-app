import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Donacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { EditDatosComponent } from '../edit-datos/edit-datos.component';
import { VerDatosComponent } from '../ver-datos/ver-datos.component';

@Component({
  selector: 'app-list-datos',
  templateUrl: './list-datos.component.html',
  styleUrls: ['./list-datos.component.scss'],
})
export class ListDatosComponent implements OnInit {

  @Input() donaciones: Donacion[]| any ;

  @Output() donacionEdited = new EventEmitter<void>();

  @Output() donacionDeleted = new EventEmitter<Donacion>();

  private path = 'Donaciones';

  loading: any;


  constructor(public user : UserService,
              public firestoreService: FirestoreService,
              private modalCtrl : ModalController,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) { }

              filterPost = '';
              uid = '';

  ngOnInit() {

    this.uid = this.user.getUserId();
    this.getDonaciones();
  }

  getDonaciones() {
    this.firestoreService.getCollection<Donacion>(this.path).subscribe(res => {
      console.log(res); // Verificar que res contiene los datos que esperas
      this.donaciones = res.filter(d => d.userId === this.uid);
    }, error => {
      console.log(error);
    });
  }

  getDonaciones1() {
    this.firestoreService.getCollection<Donacion>(this.path).subscribe(  res => {
           this.donaciones = res;
    });
  }

  async openModal(donaciones: Donacion) {
    if (donaciones && donaciones.id) {
      const modal = await this.modalCtrl.create({
        component: EditDatosComponent,
        componentProps:{

          id: donaciones.id,
          nombre: donaciones.nombre,
          rut: donaciones.rut,
          banco: donaciones.banco,
          tipo: donaciones.tipo,
          cuenta:donaciones.cuenta,
          correo: donaciones.correo
        },
      });
      await modal.present();
    }
  }



  async deleteDonacion(donacion : Donacion) {

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>Eliminar</strong> estos datos',
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
            this.firestoreService.deleteDoc(this.path, donacion.id).then( res => {
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch( error => {
                this.presentToast('no se pude eliminar');
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

  async verMas(donaciones : Donacion) {

    const modal = await this.modalCtrl.create({
      component: VerDatosComponent,
      componentProps: {

        nombre: donaciones.nombre,
        rut: donaciones.rut,
        banco: donaciones.banco,
        tipo: donaciones.tipo,
        cuenta:donaciones.cuenta,
        correo: donaciones.correo,

         }

    });
   return  await modal.present();
  }

}
