import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.scss'],
})
export class EditPublicacionComponent implements OnInit {


  nuevoInput = new FormControl('', Validators.required);


  @Input()
  titulo!: string | any ;

  constructor(private modalCtrl: ModalController,
              private fb : FormBuilder,
              private publicacionService : PublicacionService,
              ) {}

  ngOnInit() {

   }


  dismissModal(){
    this.modalCtrl.dismiss(null, 'Cancel');
  }

  save(){

    const newtitulo = this.titulo + this.nuevoInput.value;


    this.modalCtrl.dismiss(newtitulo, 'cambio');



  }



  }
