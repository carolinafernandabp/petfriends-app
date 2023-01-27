import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Adoptar, EstadoPedido } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-adoptar',
  templateUrl: './edit-adoptar.component.html',
  styleUrls: ['./edit-adoptar.component.scss'],
})
export class EditAdoptarComponent implements OnInit {

  @Input() adopciones: Adoptar[] | any;

  enableNewAdoptar = false;

  private path = 'Adoptar';

  loading: any;


  timestamp: any;
  date: any;


  constructor(public user : UserService,
              public firestoreService: FirestoreService,
              private modalCtrl : ModalController,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) { }

  ngOnInit() {

    this.getAdoptar();
  }


  getAdoptar() {
    this.firestoreService.getCollection<Adoptar>(this.path).subscribe(  res => {
           this.adopciones = res;
    });
  }

  updateAdoptar(adopcion: any, estado: EstadoPedido) {
    const updateData:any = { estado: estado };
    this.firestoreService.updateDoc(updateData, this.path, adopcion.id)
    .then(() => {
    this.presentToast('Estado actualizado exitosamente');
    })
    .catch(() => {
    this.presentToast('Error al actualizar el estado');
    });
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
