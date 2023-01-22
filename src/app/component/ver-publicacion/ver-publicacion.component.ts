import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { ListPublicacionComponent } from '../list-publicacion/list-publicacion.component';

@Component({
  selector: 'app-ver-publicacion',
  templateUrl: './ver-publicacion.component.html',
  styleUrls: ['./ver-publicacion.component.scss'],
})
export class VerPublicacionComponent implements OnInit {


  constructor(private modalCtrl: ModalController,
                private publicacionService : PublicacionService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }






}
