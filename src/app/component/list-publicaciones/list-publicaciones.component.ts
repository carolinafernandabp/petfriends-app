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
                private router : Router,
                ) { }

                filterPost = '';
                uid = '';

  ngOnInit() {

    this.uid = this.user.getUserId();
    this.getPublicaciones();
  }

  getPublicaciones() {
    if (this.user.isLoggedOut$) { // si el usuario no ha iniciado sesión
      this.firestoreService.getCollection<Publicacion>(this.path).subscribe(res => {
        console.log(res);
        this.publicaciones = res;
      });
    } else { // si el usuario ha iniciado sesión
      this.firestoreService.getCollection<Publicacion>(this.path).subscribe(res => {
        this.publicaciones = res.filter(p => p.userId === this.uid);
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
          create: publicaciones.create
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
              this.presentToastSuccess('Eliminado con exito');
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


    this.router.navigate(['/adoptar', publicaciones.id]);
   return  await modal.present();


  }


  singup(){
    this.router.navigate(['form-adoptar']);
  }


  postular(){
    this.router.navigate(['solicitud']);
  }



}
