import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-publicaciones',
  templateUrl: './ver-publicaciones.component.html',
  styleUrls: ['./ver-publicaciones.component.scss'],
})
export class VerPublicacionesComponent implements OnInit {

  @Input()
  foto!: string;
  @Input()
  titulo!: string;
  @Input()
  description!: string;
  @Input()
  category!: string;
  @Input()
  create!: { seconds: number };

  formattedDate!: string;

  constructor(private modalCtrl: ModalController) {

    this.create = { seconds: 1646456000 }; // ejemplo con una fecha fija
    const date = new Date(this.create.seconds * 1000);
    this.formattedDate = date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
   }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }


}
