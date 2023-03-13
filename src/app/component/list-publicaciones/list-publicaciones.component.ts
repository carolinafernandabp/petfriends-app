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


  private path = 'Publicaciones';

  loading: any;

  userId: string | null = null;

  constructor( public user : UserService,
                public firestoreService: FirestoreService,
                private modalCtrl : ModalController,
                public toastController: ToastController,
                public alertController: AlertController ,
                public loadingController: LoadingController,
                private router : Router,
                ) { }

  ngOnInit() {

    this.user.getUserId2().subscribe(userId => {
      this.userId = userId;
    });
    this.getPublicaciones();
    this.getPublicaciones2();
  }

  getPublicaciones() {
      // Si el usuario está logueado, mostrar solo sus publicaciones
      this.firestoreService.getCollection<Publicacion>(this.path).subscribe(res => {
        console.log(res); // Verificar que res contiene los datos
        this.publicaciones = res.filter(f => f.userId === this.userId);
      }, error => {
        console.log(error);
      });
  }

  getPublicaciones2(){

    if(this.user.isLoggedOut$){
      this.firestoreService.getCollection<Publicacion>(this.path).subscribe(res => {
        console.log(res); // Verificar que res contiene los dato
        this.publicaciones  = res;
      });
  }
}


  async openModal(publicaciones: Publicacion) {
    if (publicaciones && publicaciones.id) {
      const modal = await this.modalCtrl.create({
        component: EditPublicacionesComponent,
        componentProps: {
          id: publicaciones.id,
          titulo: publicaciones.titulo,
          description: publicaciones.description,
          foto: publicaciones.foto,
          category: publicaciones.category,
          create: publicaciones.create,
          userId : publicaciones.userId
        },
      });
      await modal.present();
    }
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
              this.presentToastSuccess('Eliminado con éxito');
              this.alertController.dismiss();
            }).catch( error => {
                this.presentToastDanger('No se pude eliminar');
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
  async verMas(publicaciones  : Publicacion) {


    const modal = await this.modalCtrl.create({
      component: VerPublicacionesComponent,
      componentProps: {

        id: publicaciones.id,
        titulo: publicaciones.titulo,
        description:publicaciones.description,
        foto : publicaciones.foto,
        category: publicaciones.category,
        create: publicaciones.create

         }

    });
   return  await modal.present();

  }


  signup() {
    this.router.navigate(['form-adoptar']);
  }

  postular(){
    this.router.navigate(['solicitud']);
  }



}
