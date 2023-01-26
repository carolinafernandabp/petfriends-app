import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-datos',
  templateUrl: './ver-datos.component.html',
  styleUrls: ['./ver-datos.component.scss'],
})
export class VerDatosComponent implements OnInit {

  @Input()
  nombre!: string;
  @Input()
  rut!: string;
  @Input()
  banco!: string;
  @Input()
  tipo!: string;
  @Input()
  foto!: string;
  @Input()
  cuenta!: string;
  @Input()
  correo!: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }



}
