import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ver-datos',
  templateUrl: './ver-datos.component.html',
  styleUrls: ['./ver-datos.component.scss'],
})
export class VerDatosComponent implements OnInit {

  @Input()
  nombre!: string;
  @Input()
  rut!: string;
  @Input()
  banco!: string;
  @Input()
  tipo!: string;
  @Input()
  foto!: string;
  @Input()
  cuenta!: string;
  @Input()
  correo!: string;

  constructor(private modalCtrl: ModalController,
                private toastController : ToastController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
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
