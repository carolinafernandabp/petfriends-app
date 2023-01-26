import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Ficha } from 'src/app/models/ficha-mascota';
import { FichaMascotaService } from 'src/app/services/ficha.service';
import { PublicacionService } from 'src/app/services/publicacion.service';

@Component({
  selector: 'app-edit-ficha',
  templateUrl: './edit-ficha.component.html',
  styleUrls: ['./edit-ficha.component.scss'],
})
export class EditFichaComponent implements OnInit {

  @Input() nombre!: string;

  @Input() raza!: string;

  form!: FormGroup;

  fichas! : Ficha;

  constructor(private modalCtrl: ModalController,
                private fb : FormBuilder,
                public  fichaService : FichaMascotaService ,
                @Inject(NavParams) ficha : Ficha) {


                  this.fichas= this.fichas

                  this.fichas = ficha;
                  this.form = this.fb.group({
                    nombre:['', this.fichas.nombre],
                    raza:['',this.fichas.raza]

                  })
                }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  save(){


    const changes = this.form.value;

    this.fichaService.updateFicha(this.fichas.id, changes)

        .subscribe(() => {

            this.modalCtrl.dismiss(changes);
            location.reload();

        });


  }




}
