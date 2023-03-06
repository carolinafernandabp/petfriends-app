import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Ficha } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { EditFichasComponent } from '../edit-fichas/edit-fichas.component';
import { VerFichasComponent } from '../ver-fichas/ver-fichas.component';

@Component({
  selector: 'app-list-fichas',
  templateUrl: './list-fichas.component.html',
  styleUrls: ['./list-fichas.component.scss'],
})
export class ListFichasComponent implements OnInit {


  @Input() fichas: Ficha[]| any ;

  @Output() fichaEdited = new EventEmitter<void>();

  @Output() fichaDeleted = new EventEmitter<Ficha>();

  private path = 'Fichas';

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
    this.getFichas();
  }

  getFichas() {
    this.firestoreService.getCollection<Ficha>(this.path).subscribe(res => {
      console.log(res); // Verificar que res contiene los datos que esperas
      this.fichas= res.filter(f => f.userId === this.uid);
    }, error => {
      console.log(error);
    });
  }



  async openModal(fichas : Ficha) {
    if (fichas && fichas.id) {
      const modal = await this.modalCtrl.create({
        component: EditFichasComponent,
        componentProps:{

          id: fichas.id,
          nombre: fichas.nombre,
          nacimiento: fichas.nacimiento,
          raza: fichas.raza,
          color: fichas.color,
          tamanio: fichas.tamanio,
          description: fichas.description,
          foto: fichas.foto,
          especie: fichas.especie,
          estado: fichas.estado,
          microChip: fichas.microChip,

        },
      });
      await modal.present();
    }
  }


  async deleteFicha(ficha : Ficha) {

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>Eliminar</strong> esta ficha',
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
            this.firestoreService.deleteDoc(this.path, ficha.id).then( res => {
              this.presentToastSuccess('Eliminado con exito');
              this.alertController.dismiss();
            }).catch( error => {
                this.presentToastDanger('no se pudo eliminar');
            });
          }
        }
      ]
    });
    await alert.present();
}

async verMas(fichas : Ficha) {

  const modal = await this.modalCtrl.create({
    component: VerFichasComponent,
    componentProps: {

      nombre: fichas.nombre,
      nacimiento: fichas.nacimiento,
      raza: fichas.raza,
      color: fichas.color,
      tamanio: fichas.tamanio,
      description: fichas.description,
      foto: fichas.foto,
      especie: fichas.especie,
      estado: fichas.estado,
      microChip: fichas.microChip,


       }

  });
 return  await modal.present();
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
