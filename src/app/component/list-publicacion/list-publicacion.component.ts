import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { catchError, tap, throwError } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-publicacion',
  templateUrl: './list-publicacion.component.html',
  styleUrls: ['./list-publicacion.component.scss'],
})
export class ListPublicacionComponent implements OnInit {

  @Input() publicaciones !: Publicacion[] | any;

  @Output() publicacionEdited = new EventEmitter();

  @Output() publicacionDeleted = new EventEmitter<Publicacion>();



  constructor( private router : Router,
              private publicacionService : PublicacionService,
              public user : UserService,
              private modalCtrl : ModalController) { }

  ngOnInit() {}

  async onDeleteCourse(publicacion : Publicacion){

    (await this.publicacionService.deletePublicacion(publicacion.id))
    .pipe(
      tap(() => {

        console.log('Eliminar publicaicon',publicacion);
        this.publicacionDeleted.emit(publicacion);
      }),
      catchError( err => {
        console.log(err);
        alert('Could not delete');
        return throwError(err);
      })
    )
    .subscribe();
  }


/*
async presentModal() {
  const modal = await this.modalCtrl.create({
    component: EditPublicacionComponent,
    componentProps:{
      titulo: this.publicaciones.titulo,
      description: this.publicaciones.description
    }

  });
  return await modal.present();
}
*/
}
