import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { catchError, tap, throwError } from 'rxjs';
import { Ficha } from 'src/app/models/ficha-mascota';
import { FichaMascotaService } from 'src/app/services/ficha.service';
import { UserService } from 'src/app/services/user.service';
import { EditFichaComponent } from '../edit-ficha/edit-ficha.component';
import { VerFichaComponent } from '../ver-ficha/ver-ficha.component';

@Component({
  selector: 'app-list-ficha-mascota',
  templateUrl: './list-ficha-mascota.component.html',
  styleUrls: ['./list-ficha-mascota.component.scss'],
})
export class ListFichaMascotaComponent implements OnInit {

  @Input() fichas!: Ficha[] | any;

  @Output() fichaEdited = new EventEmitter<void>();

  @Output() fichaDeleted = new EventEmitter<Ficha>();


  constructor(
                private fichaService : FichaMascotaService,
                private modalCtrl : ModalController,) { }

  ngOnInit() {}

  async openModal(fichas : Ficha) {
    const modal = await this.modalCtrl.create({
      component: EditFichaComponent,
      componentProps:{

        nombre: fichas.nombre,
        raza: fichas.raza

      },
    });

     await modal.present();


  }


  async onDeleteFicha(ficha : Ficha) {

    (await this.fichaService.deleteFicha(ficha.id))
        .pipe(
            tap(() => {
                console.log("Deleted ficha", ficha);
                this.fichaDeleted.emit(ficha);
            }),
            catchError(err => {
                console.log(err);
                alert("Could not delete ficha.");
                return throwError(err);
            })
        )
        .subscribe();

}


async verFicha(fichas : Ficha) {

  const modal = await this.modalCtrl.create({
    component: VerFichaComponent,
    componentProps: {

      nombre : fichas.nombre,
      raza : fichas.raza

       }


  });
 return  await modal.present();
}





}
