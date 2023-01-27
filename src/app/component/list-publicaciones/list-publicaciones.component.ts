import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { EditPublicacionesComponent } from 'src/app/component/edit-publicaciones/edit-publicaciones.component';
import { Publicacion } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { VerPublicacionesComponent } from '../ver-publicaciones/ver-publicaciones.component';

@Component({
  selector: 'app-list-publicaciones',
  templateUrl: './list-publicaciones.component.html',
  styleUrls: ['./list-publicaciones.component.scss'],
})
export class ListPublicacionesComponent implements OnInit {

  @Input() publicaciones: Publicacion[]| any ;

  @Output() publicacionEdited = new EventEmitter<void>();

  @Output() publicacionDeleted = new EventEmitter<Publicacion>();


  private path = 'Publicaciones/';

  loading: any;

  constructor( public user : UserService,
                public firestoreService: FirestoreService,
                private modalCtrl : ModalController,
                public toastController: ToastController,
                public alertController: AlertController ,
                public loadingController: LoadingController,
                private router : Router) { }

  ngOnInit() {

    this.getPublicaciones();
  }

  getPublicaciones() {
    this.firestoreService.getCollection<Publicacion>(this.path).subscribe(  res => {
           this.publicaciones = res;
    });
  }

  async openModal(publicaciones  : Publicacion) {
    const modal = await this.modalCtrl.create({
      component: EditPublicacionesComponent,
      componentProps:{


        titulo: publicaciones.titulo,
        description:publicaciones.description,

      },


    });

     await modal.present();


  }

  async deletePublicacion(publicacion : Publicacion) {

    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: ' Seguro desea <strong>Eliminar</strong> esta publicacion',
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
            this.firestoreService.deleteDoc(this.path, publicacion.id).then( res => {
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

  async verMas(publicaciones  : Publicacion) {

    const modal = await this.modalCtrl.create({
      component: VerPublicacionesComponent,
      componentProps: {

        foto: publicaciones.foto,
        titulo: publicaciones.titulo,
        description:publicaciones.description,
        category:publicaciones.category

         }



    });


   return  await modal.present();
  }


  singup(){
    this.router.navigate(['form-adoptar']);
  }



}
