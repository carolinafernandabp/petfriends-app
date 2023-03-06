import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EstadoPedido, Voluntario } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-voluntario',
  templateUrl: './edit-voluntario.component.html',
  styleUrls: ['./edit-voluntario.component.scss'],
})
export class EditVoluntarioComponent implements OnInit {

  @Input() voluntarios: Voluntario[] | any;

  enableNewVoluntario = false;

  private path = 'Voluntario';

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

    this.getVoluntario();
  }

  getVoluntario() {
    this.firestoreService.getCollection<Voluntario>(this.path).subscribe(  res => {
           this.voluntarios = res;
    });
  }

  updateAdoptar(voluntario: any, estado: EstadoPedido) {
    const updateData:any = { estado: estado };
    this.firestoreService.updateDoc(updateData, this.path, voluntario.id)
    .then(() => {
    this.presentToastSuccess('Estado actualizado exitosamente');
    })
    .catch(() => {
    this.presentToastDanger('Error al actualizar el estado');
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
