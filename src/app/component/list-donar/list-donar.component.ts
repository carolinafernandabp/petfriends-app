import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { catchError, tap, throwError } from 'rxjs';
import { Donacion } from 'src/app/models/donar';
import { DonarService } from 'src/app/services/donar.service';

@Component({
  selector: 'app-list-donar',
  templateUrl: './list-donar.component.html',
  styleUrls: ['./list-donar.component.scss'],
})
export class ListDonarComponent implements OnInit {

  @Input() donaciones!: Donacion[]| any ;

  @Output() donacionEdited = new EventEmitter<void>();

  @Output() donacionDeleted = new EventEmitter<Donacion>();


  constructor(private donarService : DonarService,
              private modalCtrl : ModalController) { }

  ngOnInit() {}

  async onDeletePublicacion(donacion : Donacion) {

    (await this.donarService.deleteDonar(donacion.id))
        .pipe(
            tap(async () => {

                console.log("Deleted course", donacion);
                this.donacionDeleted.emit(donacion);
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

}
