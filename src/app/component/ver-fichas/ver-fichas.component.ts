import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-fichas',
  templateUrl: './ver-fichas.component.html',
  styleUrls: ['./ver-fichas.component.scss'],
})
export class VerFichasComponent implements OnInit {

  @Input()
  foto!: string;
  @Input()
  nombre!: string;
  @Input()
  nacimiento!: string;
  @Input()
  raza!: string;
  @Input()
  color!: string;
  @Input()
  tamanio!: string;
  @Input()
  description!: string;
  @Input()
  especie!: string;
  @Input()
  estado!: string;
  @Input()
  microChip!: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
