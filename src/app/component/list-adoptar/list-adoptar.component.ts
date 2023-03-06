import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Adoptar } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-adoptar',
  templateUrl: './list-adoptar.component.html',
  styleUrls: ['./list-adoptar.component.scss'],
})
export class ListAdoptarComponent implements OnInit {

  @Input() adopciones: Adoptar[] | any;

  enableNewAdoptar = false;

  private path = 'Adoptar/';

  loading: any;


  timestamp: any;
  date: any;

  constructor(public user : UserService,
              public firestoreService: FirestoreService,
              private modalCtrl : ModalController,
              public toastController: ToastController,
              public alertController: AlertController ,
              public loadingController: LoadingController) {

              }

  ngOnInit() {

    this.getAdoptar();
  }

  getAdoptar() {
    this.firestoreService.getCollection<Adoptar>(this.path).subscribe(  res => {
           this.adopciones = res;
    });
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
