import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.scss'],
})
export class EditPublicacionComponent implements OnInit {
  name!: string;

  //form : FormGroup;

  //publicacion!: Publicacion;


  constructor(private modalCtrl: ModalController,
              private fb : FormBuilder,
              private publicacionService : PublicacionService,) {

                /*
                this.publicacion = this.publicacion;

                this.form = this.fb.group({
                titulo:[this.publicacion.titulo, Validators.required],
                descripction:[this.publicacion.description, Validators.required]

                })
*/
              }

  ngOnInit() {}
  /*

  close(){
    this.modalCtrl.dismiss();
  }

  save(){

    const changes = this.form.value;
    this.publicacionService.updatePublicacion(this.publicacion.id ,changes)
    .subscribe(() =>{

      this.modalCtrl.dismiss(changes);
    })

  }

  */
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }



}
