import { Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  IonModal, ModalController, NavParams} from '@ionic/angular';
import { Publicacion } from '../models/publicacion';
import { PublicacionService } from '../services/publicacion.service';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.scss'],
})
export class EditPublicacionComponent implements OnInit {

  @Input() titulo!: string;
  @Input() description!: string;

  form : FormGroup;

  publicacion!: Publicacion;

  constructor(
                private modalCtrl: ModalController,
                private fb : FormBuilder,
                private publicacionService : PublicacionService,
               )
               {

                this.publicacion = this.publicacion;

                  this.form = this.fb.group({
                    titulo:[this.publicacion.titulo, Validators.required]

                  })

                }

  ngOnInit() {}


  save(){
    const changes = this.form.value;
    this.publicacionService.updatePublicacion(this.publicacion.id ,changes)
    .subscribe(() =>{


    })

  }

//correcto
  close(){
    this.modalCtrl.dismiss();
  }

}
