import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.scss'],
})
export class VerPublicacionComponent implements OnInit {

  @Input()
  titulo!: string;
  @Input()
  description!: string;


  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }






}
