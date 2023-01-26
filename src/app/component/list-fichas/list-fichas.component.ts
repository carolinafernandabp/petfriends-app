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

  @Output() fichanEdited = new EventEmitter<void>();

  @Output() fichanDeleted = new EventEmitter<Ficha>();

  private path = 'Fichas/';

  loading: any;

  constructor(public user : UserService,
              public firestoreService: FirestoreService,
              private modalCtrl : ModalController,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) { }

  ngOnInit() {

    this.getFichas();
  }

  getFichas() {
    this.firestoreService.getCollection<Ficha>(this.path).subscribe(  res => {
           this.fichas = res;
    });
  }

  async openModal(ficha : Ficha) {
    const modal = await this.modalCtrl.create({
      component: EditFichasComponent,
      componentProps:{

        nombre: ficha.nombre,
        nacimiento: ficha.nacimiento,
        raza: ficha.raza,
        color: ficha.color,
        tamanio: ficha.tamanio,
        description: ficha.description,
        foto: ficha.foto,
        especie: ficha.especie,
        estado: ficha.estado,
        microChip: ficha.microChip,


      },
    });

     await modal.present();


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
