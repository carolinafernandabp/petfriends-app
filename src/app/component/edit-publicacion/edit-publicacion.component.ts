import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Publicacion } from 'src/app/models/publicacion';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.component.html',
  styleUrls: ['./edit-publicacion.component.scss'],
})
export class EditPublicacionComponent implements OnInit {

  @Input()
  titulo!: string;
  @Input()
  description!: string;

  form!: FormGroup;

  publicaciones!: Publicacion;



  constructor(private modalCtrl: ModalController,
              private fb : FormBuilder,
              public  publicacionService : PublicacionService,
              @Inject(NavParams) publicacion: Publicacion
              ) {

                this.publicaciones = publicacion;

                this.publicaciones = publicacion;
                this.form = this.fb.group({
                  titulo:['', this.publicaciones.titulo],
                  description:['',this.publicaciones.description]

                })
              }


  ngOnInit() {}


  dismissModal(){
    this.modalCtrl.dismiss();
  }

  save(){

    const changes = this.form.value;

    this.publicacionService.updatePublicacion(this.publicaciones.id, changes)

        .subscribe(() => {

            this.modalCtrl.dismiss(changes);
            location.reload();

        });


  }



  }

