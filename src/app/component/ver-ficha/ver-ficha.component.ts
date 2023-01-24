import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ver-ficha',
  templateUrl: './ver-ficha.component.html',
  styleUrls: ['./ver-ficha.component.scss'],
})
export class VerFichaComponent implements OnInit {

  @Input()
  nombre!: string;
  @Input()
  raza!: string;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }


}
