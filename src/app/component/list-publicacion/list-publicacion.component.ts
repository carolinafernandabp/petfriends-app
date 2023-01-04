import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { catchError, tap, throwError } from 'rxjs';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { UserService } from 'src/app/services/user.service';
import { EditPublicacionComponent } from '../edit-publicacion/edit-publicacion.component';

@Component({
  selector: 'app-list-publicacion',
  templateUrl: './list-publicacion.component.html',
  styleUrls: ['./list-publicacion.component.scss'],
})
export class ListPublicacionComponent implements OnInit {

  @Input()
  publicaciones!: Publicacion[] | any;

  @Output()
  publicacionEdited = new EventEmitter();

  @Output()
  publicacionDelete = new EventEmitter<Publicacion>();
  dialog: any;



  constructor(private router : Router,
              private publicacionService : PublicacionService,
              public user : UserService,
              private modalCtrl : ModalController) { }

  ngOnInit() {}

  editCourse(publicacion : Publicacion) {

    const modal = new this.dialog

    modal.disableClose = true;
    modal.autoFocus = true;
    modal.minWidth = "400px";

    modal.data = publicacion;

    this.dialog.open(EditPublicacionComponent, modal)
        .afterClosed()
        .subscribe((val: any) => {
            if (val) {
                this.publicacionEdited.emit();

            }
        });

}


  async onDeleteCourse(publicacion : Publicacion) {

  (await this.publicacionService.deletePublicacion(publicacion.id))
      .pipe(
          tap(() => {

              console.log("Deleted course", publicacion);
              this.publicacionDelete.emit(publicacion);


          }),
          catchError(err => {
              console.log(err);
              alert("Could not delete course.");
              return throwError(err);
          })
      )
      .subscribe();


}

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

}