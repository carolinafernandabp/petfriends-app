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

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }


}
