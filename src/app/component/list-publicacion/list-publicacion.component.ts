import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { catchError, tap, throwError } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UserService } from 'src/app/services/user.service';
import { EditPublicacionComponent } from '../edit-publicacion/edit-publicacion.component';
import { VerPublicacionComponent } from '../ver-publicacion/ver-publicacion.component';

@Component({
  selector: 'app-list-publicacion',
  templateUrl: './list-publicacion.component.html',
  styleUrls: ['./list-publicacion.component.scss'],
})
export class ListPublicacionComponent implements OnInit {

  @Input() publicaciones: Publicacion[]| any ;

  @Output() publicacionEdited = new EventEmitter<void>();

  @Output() publicacionDeleted = new EventEmitter<Publicacion>();

  newtitulo!: string;

  constructor( private router : Router,
                private publicacionService : PublicacionService,
                  private modalCtrl : ModalController,
                    private alertCtrl : AlertController,
                      public user : UserService
                      ) { }

  ngOnInit() {}



  async openModal(publicaciones  : Publicacion) {
    const modal = await this.modalCtrl.create({
      component: EditPublicacionComponent,
      componentProps:{
        titulo :  this.publicaciones.titulo,
        description : this.publicaciones.description
      },
    });
    await modal.present();


    const {data: newtitulo , role} = await modal.onWillDismiss();
    if(role === 'cambio'){
      const index = this.publicaciones.findIndex( (post: { titulo: string; }) => post.titulo ===  publicaciones.titulo)
      this.publicaciones[index].titulo = newtitulo;

      const alert = await this.alertCtrl.create({header: 'Editar', message :'Editado exitosamente', buttons: ['Cerrar']})
      await alert.present();
    }

  }


  async onDeletePublicacion(publicacion : Publicacion) {

    (await this.publicacionService.deletePublicacion(publicacion.id))
        .pipe(
            tap(async () => {

                console.log("Deleted course", publicacion);
                this.publicacionDeleted.emit(publicacion);
                location.reload();

            }),
            catchError(err => {
                console.log(err);
                alert("Could not delete course.");
                return throwError(err);
            })
        )
        .subscribe();

}

async verMas() {
  const modal = await this.modalCtrl.create({
    component: VerPublicacionComponent,
    componentProps: {

      titulo : this.publicaciones.titulo,
      description : this.publicaciones.description

       }
  });
  await modal.present();
}



}
